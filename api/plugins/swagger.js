module.exports = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: process.env.HOST || 'localhost:3000',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Todo', description: 'Todos related end-points' },
      { name: 'Authentication', description: 'Authentication related end-points' }
    ],
    definitions: {
      User: {
        $id: 'User',
        type: 'object',
        required: ['email', 'firstName', 'lastName'],
        properties: {
          _id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string', nullable: true },
          lastName: { type: 'string', nullable: true },
          email: {type: 'string', format: 'email' }
        }
      },
      Todo: {
        $id: 'Todo',
        type: 'object',
        required: ['title', 'email'],
        properties: {
          _id: { type: 'string', format: 'uuid' },
          title: { type: 'string' },
          date: { type: 'string', format: 'date'  },
          completed: { type: 'boolean' },
        }
      }
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  },
  exposeRoute: true
};