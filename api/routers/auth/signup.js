const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const schema = {
  description: 'Sign up - create new user',
  tags: ['Authentication'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
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
  const { email, password, firstName, lastName } = request.body;
  const Users = fastify.mongo.collection('user');

  if(!firstName || !lastName || !email) {
    throw new Error('Email or firstName or lastName is not provided');
  }
  if(password.length < 6) {
    throw new Error('Password length is to small. Should be at least 6 character');
  }

  const existedUSer = await Users.findOne({ email });

  if(existedUSer) {
    throw new Error('User with this email is already exist');
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await Users.insert({
    email,
    hash,
    profile: {
      firstName,
      lastName,
    },
    createdAt: new Date(),
  });
  const newUser = result.ops[0];

  const token = jwt.sign({ user: { _id: newUser._id } }, options.configs.JWT_SECRET);

  return { token, user: _.omit(newUser, 'hash') };
};

module.exports = {
  router,
  schema,
};