const configs = require('../configs/configs');
const prefix = 'api/v1';

function routes (fastify) {
  fastify.register(require('./todo'), { prefix, configs });
}

module.exports = routes;