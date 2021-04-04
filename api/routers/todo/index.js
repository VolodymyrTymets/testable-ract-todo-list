const get = require('./get');
const list = require('./list');
const create = require('./create');
const edit = require('./edit');
const remove = require('./remove');

async function routes (fastify, options) {
  fastify.get('/todo', { schema: list.schema, }, list.router(fastify, options));
  fastify.get('/todo/:id', { schema: get.schema }, get.router(fastify, options));
  fastify.post('/todo', {
    schema: create.schema,
    preValidation: options.passport.authenticate('jwt', { session: false })
  }, create.router(fastify, options));
  fastify.patch('/todo/:id', {
    schema: edit.schema,
    preValidation: options.passport.authenticate('jwt', { session: false })
  }, edit.router(fastify, options));
  fastify.delete('/todo/:id', {
    schema: remove.schema,
    preValidation: options.passport.authenticate('jwt', { session: false })
  }, remove.router(fastify, options));
}

module.exports = routes;