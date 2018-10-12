const schedule = require('node-schedule')
const helper = require('./helper')

module.exports = server => {

  // 周2、4工作日上午10点提醒开晨会
  schedule.scheduleJob('0 0 10 * * 2,4', () => {
    server.logger().info('ScheduleJob: Morning Meeting')
    if (!helper.isWorkday()) return
    server.robot.sendMorningMeetingMsg()
  })

  // 每周最后一个工作日下午6点提醒发周报
  schedule.scheduleJob('0 0 18 * * *', () => {
    server.logger().info('ScheduleJob: Weekly Report')
    if (!helper.isLastWorkdayOfWeek()) return
    server.robot.sendWeeklyReportMsg()
  })

  // 每个工作日下午3点发Bug报告
  schedule.scheduleJob('0 0 15 * * *', async () => {
    server.logger().info('ScheduleJob: Daily Bugs Report')
    if (!helper.isWorkday()) return

    const bugList = await server.spider.getReportBugs()
    await server.robot.sendBugReportMsg(bugList)

    // 如果没有Bug，有一定概率让坤哥请喝下午茶
    if (bugList.length === 0 && Math.random() > 0.5) {
      server.robot.sendDrinkRequireMsg()
    }
  })
}