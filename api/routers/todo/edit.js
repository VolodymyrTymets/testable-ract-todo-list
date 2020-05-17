const ObjectID = require('mongodb').ObjectID;

const edit = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  const { completed } = request.body;
  const Todos = fastify.mongo.collection('todo');
  if(!id) {
    throw new Error('Id is not defined');
  }
  if(completed  === undefined) {
    throw new Error('completed is not defined');
  }
  await Todos.updateOne({ _id: ObjectID(id) }, { $set: { completed } });
  const editedTodo = await Todos.findOne({ _id: ObjectID(id) });
  return editedTodo;
}

module.exports = edit;