const ObjectID = require('mongodb').ObjectID;

const remove = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  const Todos = fastify.mongo.collection('todo');
  await Todos.remove({ _id: ObjectID(id) });
  return { id };
};

module.exports = remove;