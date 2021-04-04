const schema = {
  description: 'Create Todo',
  tags: ['Todo'],
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      date: { type: 'string', format: 'date' },
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

const create = (fastify, options) => async (request, reply) => {
  const { title, date = new Date } = request.body;
  const Todos = fastify.mongo.collection('todo');
  if(!title) {
    throw new Error('Tittle is not defined');
  }
  if(title.length < 3) {
    throw new Error('Tittle length is to small. Should be at least 3 character');
  }

  const result = await Todos.insert({
    title,
    createdAt: new Date(),
    date: date,
    completed: false,
  });
  const newTodo = result.ops[0];
  return newTodo;
};

module.exports = {
  router: create,
  schema,
};