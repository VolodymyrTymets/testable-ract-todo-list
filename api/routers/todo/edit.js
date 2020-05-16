const ObjectID = require('mongodb').ObjectID;

const edit = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  const { completed } = request.body;
  const Todos = fastify.mongo.collection('todo');
  await Todos.updateOne({ _id: ObjectID(id) }, { $set: { completed } });
  const editedTodo = await Todos.findOne({ _id: ObjectID(id) });
  return editedTodo;
}

module.exports = edit;