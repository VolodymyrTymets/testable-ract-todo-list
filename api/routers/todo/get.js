const ObjectID = require('mongodb').ObjectID;

const schema = {
  description: 'Get single todo',
  response: {
    201: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          date: { type: 'string', format: 'date' },
          completed: { type: 'boolean' },
        }
      }
    }
  },
};

const router = (fastify, options) => async (request, reply) => {
  const { id } = request.params;
  let _id = null;
  try {
    _id = ObjectID(id);
  } catch (e) {
    throw new Error(e.message);
  }

  const Todos = fastify.mongo.collection('todo');
  const todo = await Todos.findOne({ _id });
  return todo;
};

module.exports = {
  router,
  schema,
};