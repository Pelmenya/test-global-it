const fs = require('fs');

const path = require('path');

const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/static'), {
	root: path.join(__dirname, '/public'),
	prefix: '/public/'
  })

fastify.register(require('@fastify/cors'), {});

fastify.register(require("@fastify/view"), {
	engine: {
	  ejs: require("ejs"),
	},
	root: path.join(__dirname, "views"),
  });


fastify.get('/', async (request, reply) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}

		if(request.query.term)
		{
			const result = JSON.parse(data).filter((elem)=> elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
			reply.send(JSON.stringify(result));
		}
		else
		{
			reply.send(data);
		}

	})
});

fastify.get('/index', async (request, res) => {
	return res.view('index', { title: 'Задача 30080' })
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000})
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
