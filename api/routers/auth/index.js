const signup = require('./signup');
const signin = require('./signin');
const info = require('./info');


async function routes (fastify, options) {

  fastify.post('/auth/signup', { schema: signup.schema  }, signup.router(fastify, options));
  fastify.post('/auth/signin', { schema: signin.schema  }, signin.router(fastify, options));
  fastify.get('/auth/info', {
    schema: info.schema,
    preValidation: options.passport.authenticate('jwt', { session: false })
  }, info.router(fastify, options));
}

module.exports = routes;