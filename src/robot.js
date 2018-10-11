const axios = require('axios')
const message = require('./message')

/**
 * DingTalk Robot API
 * @see https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.34714a9742FsJV&treeId=257&articleId=105735&docType=1
 */
module.exports = (server) => {
  const logger = server.logger()

  const client = axios.create({
    baseURL: 'https://oapi.dingtalk.com/robot',
    params: {
      access_token: process.env.ROBOT_TOKEN,
    }
  })

  return {
    async sendMorningMeetingMsg() {
      const resp = await client.post('/send', message.getMorningMeetingMsg())
      logger.info('Robot: Send Morning Meeting Message Successful')
      return resp
    },
    async sendWeeklyReportMsg() {
      const resp = await client.post('/send', message.getWeeklyReportMsg())
      server.logger().info('Robot: Send Weekly Report Message Successful')
      return resp
    },
  }
}
