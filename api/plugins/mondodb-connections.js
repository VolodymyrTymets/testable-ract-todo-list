const fastifyPlugin = require('fastify-plugin');
const MongoClient = require('mongodb').MongoClient;

const DATA_BASE_NAME = process.env.DATA_BASE_NAME || 'todo';
async function dbConnector (fastify, options) {
  const url = options.url;
  delete options.url;

  const mongo = await MongoClient.connect(url, options);
  fastify.decorate('mongo', mongo.db(DATA_BASE_NAME))
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)