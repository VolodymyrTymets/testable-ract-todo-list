const fs = require('fs');
const path = require('path');
const _ = require('lodash');
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});
const fastifyPassport = require('fastify-passport');
const fastifySecureSession = require('fastify-secure-session');

const configs = require('./configs/configs');
const { toObjectID } = require('./utils/mongo/toObjectID');

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// set up secure sessions for fastify-passport to store data in
fastify.register(fastifySecureSession, { key: fs.readFileSync(path.join(__dirname, 'secret-key')),});
// initialize fastify-passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());


// register an example strategy for fastifyPassport to authenticate users using
fastifyPassport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs.JWT_SECRET,
}, function(jwt_payload, done) {
  const { user } = jwt_payload || {};
  const { _id = '' } = user || {};
  fastify.mongo.collection('user').findOne({ _id: toObjectID(_id) })
    .then((user) => {
      if (user) {
        return done(null, _.pick(user, ['_id', 'email']));
      } else {
        return done(null, false);
      }
    }).catch(err => {
      if (err) {
        return done(err, false);
      }
    })
}));


fastify.register(require('fastify-swagger'), require('./plugins/swagger'));
fastify.register(require('./plugins/mondodb-connections'), {
  url: process.env.MONGODB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./routers')(fastify, fastifyPassport);

// Run the server!
fastify.listen(process.env.PORT || '3001', '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});