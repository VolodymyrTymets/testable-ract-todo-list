const ObjectID = require('mongodb').ObjectID;

const remove = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  if(!id) {
    throw new Error('Id is not defined');
  }
  const Todos = fastify.mongo.collection('todo');
  await Todos.remove({ _id: ObjectID(id) });
  return { id };
};

module.exports = remove;