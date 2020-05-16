const fastifyPlugin = require('fastify-plugin')
const MongoClient = require('mongodb').MongoClient

async function dbConnector (fastify, options) {
  const url = options.url;
  delete options.url;

  const mongo = await MongoClient.connect(url, options);
  const databaseName = 'todo';
  fastify.decorate('mongo', mongo.db(databaseName))
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)