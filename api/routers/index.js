const configs = require('../configs/configs');
const prefix = 'api/v1';

function routes (fastify, passport) {
  fastify.register(require('./todo'), { prefix, configs, passport });
  fastify.register(require('./auth'), { prefix, configs, passport });
}

module.exports = routes;