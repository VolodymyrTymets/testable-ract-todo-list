const { queryToObject } = require('../../utils/requests');

const schema = {
  description: 'Get all todo ',
  query: {
    limit: {
      type: 'integer',
      description: 'The number of items to collect the result set',
    },
    skip: {
      type: 'integer',
      description: 'The number of items to skip before starting to collect the result set',
    },
  },
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

const list = (fastify, options) => async (request, reply) => {
  const { configs } = options;
  let { limit, skip } = queryToObject(request.query);
  skip = skip ? parseInt(skip, 10) : 0;
  limit = parseInt(limit, 10);
  limit = limit && limit < configs.maxLimitPerQuery ? limit : configs.maxLimitPerQuery;

  const Todos = fastify.mongo.collection('todo');
  const todos = await Todos.find({})
    .skip(skip)
    .limit(limit)
    .toArray();
  return todos;
};

module.exports = {
  router: list,
  schema,
};