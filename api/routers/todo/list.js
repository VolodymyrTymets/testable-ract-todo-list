const list = (fastify, options) => async (request, reply) => {
  const Todos = fastify.mongo.collection('todo');
  const todos = await Todos.find();
  return todos
};

module.exports = list;