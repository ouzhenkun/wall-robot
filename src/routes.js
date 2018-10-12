module.exports = server => server.route([
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Hello World!'
  },
  {
    method: 'GET',
    path: '/weekly-report',
    handler: async (request, h) => {
      await server.robot.sendWeeklyReportMsg()
      return h.response({ status: 200 })
    }
  },
  {
    method: 'GET',
    path: '/morning-meeting',
    handler: async (request, h) => {
      await server.robot.sendMorningMeetingMsg()
      return h.response({ status: 200 })
    }
  },
  {
    method: 'GET',
    path: '/drink-require',
    handler: async (request, h) => {
      await server.robot.sendDrinkRequireMsg()
      return h.response({ status: 200 })
    }
  },
  {
    method: 'GET',
    path: '/bug-report',
    handler: async (request, h) => {
      const bugList = await server.spider.getReportBugs()
      await server.robot.sendBugReportMsg(bugList)
      return h.response({ status: 200 })
    }
  }
])