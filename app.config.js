// pm2 ecosystem.config.js
const pkg = require('./package.json')

module.exports = {
  name: pkg.name,
  script: './src/app.js',
  watch: true,
  env: {
    ROBOT_TOKEN: '<please enter your dingTalk robot token>',
  },
}
