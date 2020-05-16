async function routes (fastify, options) {
  fastify.get('/todo', require('./list')(fastify, options));
  fastify.post('/todo', require('./create')(fastify, options));
  fastify.patch('/todo/:id', require('./edit')(fastify, options));
  fastify.delete('/todo/:id', require('./remove')(fastify, options));
}

module.exports = routes;