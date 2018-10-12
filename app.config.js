// pm2 ecosystem.config.js
const pkg = require('./package.json')

module.exports = {
  name: pkg.name,
  script: './src/app.js',
  watch: true,
  env: {
    // For robot
    ROBOT_TOKEN: '<请输入一个钉钉机器人的AccessToken>',
    MOBILE: '<你的手机号>', // 方便机器人@自己
    // For Spider
    ZENTAO_BASE_URL: '<请输入你的禅道域名>', // @example: 'http://chandao.test.com'
    ZENTAO_LOGIN_PATH: '<请输入你的禅道登陆路径>', // @example: '/zentao/user-login.html'
    ZENTAO_BUG_SOURCES: [ '<请输入你的禅道BUG来源地址>' ], // @example: [ '/zentao/bug-browse-30-bySearch-77.html' ]
    ZENTAO_USERNAME: '<请输入你的禅道登陆用户名>',
    ZENTAO_PASSWORD: '<请输入你的禅道登陆密码>',
  },
}
