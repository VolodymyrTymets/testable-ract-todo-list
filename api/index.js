// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-swagger'), require('./plugins/swagger'));
fastify.register(require('./plugins/mondodb-connections'), {
  url: process.env.MONGODB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./routers')(fastify);

// Run the server!
fastify.listen(process.env.PORT || '3001', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});