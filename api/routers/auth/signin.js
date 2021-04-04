const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const schema = {
  description: 'Sign in - log in into system',
  tags: ['Authentication'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    }
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        token: { type: 'string' },
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
  const { email, password } = request.body;
  const Users = fastify.mongo.collection('user');

  if(!email) {
    throw new Error('Email or password  is not provided');
  }
  if(password.length < 6) {
    throw new Error('Password length is to small. Should be at least 6 character');
  }

  const user = await Users.findOne({ email });
  if(!user) {
    throw new Error('User email or password is not correct');
  }
  const compare = await bcrypt.compare(password, user.hash);

  if(!compare) {
    throw new Error('User email or password is not correct');
  }

  const token = jwt.sign({ user: { _id: user._id } }, options.configs.JWT_SECRET);

  return { token, user: _.omit(user, 'hash') };
};

module.exports = {
  router,
  schema,
};