const axios = require('axios')
const message = require('./message')

/**
 * DingTalk Robot 钉钉机器人接口封装
 * @see https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.34714a9742FsJV&treeId=257&articleId=105735&docType=1
 */
module.exports = (server) => {
  const token = process.env.ROBOT_TOKEN
  const mobile = process.env.MOBILE

  const logger = server.logger()
  const client = axios.create({
    baseURL: 'https://oapi.dingtalk.com/robot',
    params: { access_token: token }
  })

  return {
    async sendMorningMeetingMsg() {
      const resp = await client.post('/send', message.getMorningMeetingMsg())
      logger.info('Robot: Send Morning Meeting Message Successful')
      return resp
    },
    async sendWeeklyReportMsg() {
      const resp = await client.post('/send', message.getWeeklyReportMsg())
      logger.info('Robot: Send Weekly Report Message Successful')
      return resp
    },
    async sendBugReportMsg(bugList) {
      const resp = await client.post('/send', message.getBugReportMsg(bugList))
      logger.info('Robot: Send Bug Report Message Successful')
      return resp
    },
    async sendDrinkRequireMsg() {
      const resp = await client.post('/send', message.getDrinkRequireMsg(mobile))
      logger.info('Robot: Send Drink Require Message Successful')
      return resp
    },
  }
}
