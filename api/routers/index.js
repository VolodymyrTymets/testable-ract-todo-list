
const prefix = 'api/v1';

function routes (fastify) {
  fastify.register(require('./todo'), { prefix });
}

module.exports = routes;