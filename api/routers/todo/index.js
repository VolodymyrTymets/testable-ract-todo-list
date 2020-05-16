async function routes (fastify, options) {
  fastify.get('/todo', {
      schema: {
        description: 'Get all todo ',
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
          }
        },
      }
    }, require('./list')(fastify, options));
  fastify.post('/todo', {
      schema: {
        description: 'Create Todo',
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            date: { type: 'string' },
          }
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              _id: { type: 'string' },
              title: { type: 'string' },
              date: { type: 'string' },
              completed: { type: 'boolean' },
            }
          }
        },
      }
    }, require('./create')(fastify, options));
  fastify.patch('/todo/:id', {
      schema: {
        description: 'Update Todo',
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
              date: { type: 'string' },
              completed: { type: 'boolean' },
            }
          }
        },
      }
    }, require('./edit')(fastify, options));
  fastify.delete('/todo/:id', {
    schema: {
      description: 'Update Todo',
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
    }
  }, require('./remove')(fastify, options));
}

module.exports = routes;