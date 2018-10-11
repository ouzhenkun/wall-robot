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

module.exports = {
  getWeeklyReportMsg,
  getMorningMeetingMsg,
}