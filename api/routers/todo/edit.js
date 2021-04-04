const ObjectID = require('mongodb').ObjectID;

const schema = {
  description: 'Update Todo',
  tags: ['Todo'],
  params: {
    type: 'object',
    properties: {
      id: {
        _id: 'string',
      }
    }
  },
  body: {
    type: 'object',
    properties: {
      completed: { type: 'boolean' },
    }
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        date: { type: 'string', format: 'date'  },
        completed: { type: 'boolean' },
      }
    }
  },
};

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

module.exports = {
  router: edit,
  schema,
};