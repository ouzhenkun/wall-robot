const axios = require('axios')
const qs = require('querystring')
const cheerio = require('cheerio')
const _ = require('lodash')

/**
 * 禅道Bug网络爬虫
 */
module.exports = (server) => {
  const baseURL = process.env.ZENTAO_BASE_URL
  const loginPath = process.env.ZENTAO_LOGIN_PATH
  const username = process.env.ZENTAO_USERNAME
  const password = process.env.ZENTAO_PASSWORD
  const bugSources = JSON.parse(process.env.ZENTAO_BUG_SOURCES)

  const logger = server.logger()
  const client = axios.create({ baseURL })

  const getReportBugs = async (opts) => {
    try {
      const cookie = await login(loginPath, username, password)

      if (!cookie) throw new Error('Cooke isEmpty')

      const bugLists = await Promise.all(
        bugSources.map(async (source) => await getBugs(cookie, source))
      )

      const reportBugs = _.uniqBy(_.flatten(bugLists), 'id')

      return reportBugs
    } catch (err) {
      logger.info('Get Report Bugs Failed', err)
      return null
    }
  }

  const login = async (path, account, password) => {
    try {
      logger.info('Zentao Login...')
      const resp = await client.post(path, qs.stringify({ account, password }), {
        responseType: 'document',
        headers: {
          ['Content-Type']: 'application/x-www-form-urlencoded',
        }
      })
      const cookie = resp.headers['set-cookie'][2]

      return cookie
    } catch (err) {
      logger.info('Zentao Login Failed', err)
      return null
    }
  }
 
  const getBugs = async (cookie, path) => {
    try {
      logger.info('Zentao getBugs...', path)
      const resp = await client.get(path, {
        responseType: 'document',
        headers: {
          ['Cookie']: `${cookie}; astProduct=30; qaBugOrder=openedDate_desc; windowWidth=1879; windowHeight=947;`
        }
      })

      const $ = cheerio.load(resp.data)
      const bugList = $('#bugList').find('tbody>tr').map((i, el) => {
        const $bug = $(el).children()
        const $get = key => $($bug[key])
        const bug = {
          id: $get(0).find('>a').text(),
          level: $get(1).text(),
          process: $get(2).text(),
          confirm: $get(3).find('>span').text().indexOf('已确认') !== -1,
          title: $get(3).find('>a').text(),
          link: baseURL + $get(3).find('>a').attr('href'),
          status: $get(4).text(),
          author: $get(5).text(),
          created: $get(6).text(),
          assign: $get(7).text(),
        }
        return bug
      }).get()

      return bugList
    } catch (err) {
      logger.info('Zentao getBugs Failed', err)
      return null
    }
  }

  return {
    getReportBugs,
  }
}

