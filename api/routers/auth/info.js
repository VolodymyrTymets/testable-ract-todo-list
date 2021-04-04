const _ = require('lodash');

const schema = {
  description: 'Get User Info',
  tags: ['Authentication'],
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        user: {
          _id: {type: 'string'},
          email: {type: 'string'},
          profile: {
            password: {type: 'string'},
            firstName: {type: 'string'},
          },
        }
      }
    }
  },
};

const router = (fastify, options) => async (request, reply) => {
  const { _id } = request.user;
  const Users = fastify.mongo.collection('user');

  const user = await Users.findOne({ _id });
  if(!user) {
    throw new Error('User in not exist');
  }

  return { user: _.omit(user, 'hash') };
};

module.exports = {
  router,
  schema,
};