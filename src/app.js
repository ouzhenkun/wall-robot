const Hapi = require('hapi')

async function start() {
  // Config Server
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })

  // Register Logger Plugin
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: {
        translateTime: true,
        colorize: true,
      },
    }
  })

  // Setup Robot: server.robot
  server.decorate('server', 'robot', require('./robot')(server))
  server.decorate('server', 'spider', require('./spider')(server))

  // Setup Routes
  require('./routes')(server)

  // Setup Schedules
  require('./schedules')(server)

  // Start
  await server.start()
  process.send('ready'); // Send Msg To Pm2
  server.logger().info(`Server running at: ${server.info.uri}`)
}

start().catch((err) => {
  console.log(err)
  process.exit(1)
})
