const ObjectID = require('mongodb').ObjectID;

const schema = {
  description: 'Remove Todo',
  params: {
    type: 'object',
    properties: {
      id: {
        _id: 'string',
      }
    }
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
      }
    }
  },
};

const remove = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  if(!id) {
    throw new Error('Id is not defined');
  }
  const Todos = fastify.mongo.collection('todo');
  await Todos.remove({ _id: ObjectID(id) });
  return { id };
};

module.exports = {
  router: remove,
  schema,
};