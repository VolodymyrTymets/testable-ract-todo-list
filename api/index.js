// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('./plugins/mondodb-connections'), {
  url: process.env.MONGODB_URI
});

require('./routers')(fastify);

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})