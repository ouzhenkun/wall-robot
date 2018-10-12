const qs = require('querystring')
const dayjs = require('dayjs')

const getWeeklyReportMsg = () => ({
  msgtype: 'text',
  text: {
    content: '大家请在下班前更新周报：[传送门](https://trello.com/b/lLPnBJZG/%E5%89%8D%E7%AB%AF%E5%91%A8%E6%8A%A5) '
  },
  at: {
    atMobiles: [],
    isAtAll: true,
  },
})

const getMorningMeetingMsg = () => ({
  msgtype: 'text',
  text: {
    content: '开晨会啦~'
  },
  at: {
    atMobiles: [],
    isAtAll: true,
  },
})

const getBugReportMsg = (reportBugs) => {
  const getBugMsg = bug => `
> [${bug.id}${bug.title}](${bug.link}) @${bug.assign}\n
> \-\-\-\n
  `
  const getToConfirmBugs = () => {
    const bugs = reportBugs.filter(b => !b.confirm)
    if (bugs.length === 0) return ''
    return `
### ${bugs.length}个待确认Bug
${bugs.map(getBugMsg).join('')}
    `
  }

  const getToFixBugs = () => {
    const bugs = reportBugs.filter(b => b.confirm)
    if (bugs.length === 0) return ''
    return `
### ${bugs.length}个未解决Bug
${bugs.map(getBugMsg).join('')}
    `
  }

  return {
    msgtype: 'markdown',
    markdown: {
      title: '每日BUG报告',
      text: reportBugs.length === 0 ? '> 今日无BUG, 洗洗睡了。' : (`
### 以下Bug请及时处理哟\n  
> \-\-\-
${getToConfirmBugs()}
${getToFixBugs()}
      `),
    },
    at: {
      atMobiles: [],
      isAtAll: true,
    }
  }
}

const getDrinkRequireMsg = (mobile) => ({
  msgtype: 'text',
  text: {
    content: `@${mobile}哥, 快来请我们喝喝下午茶~ 😋`
  },
  at: {
    atMobiles: [ mobile ],
    isAtAll: false,
  },
})

module.exports = {
  getWeeklyReportMsg,
  getMorningMeetingMsg,
  getBugReportMsg,
  getDrinkRequireMsg,
}