const create = (fastify, options) => async (request, reply) => {
  const { title, date = new Date } = request.body;
  const Todos = fastify.mongo.collection('todo');

  const result = await Todos.insert({
    title,
    createdAt: new Date(),
    date: date,
    completed: false,
  });
  const newTodo = result.ops[0];
  return newTodo;
}

module.exports = create;