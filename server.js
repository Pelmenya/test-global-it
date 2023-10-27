const fs = require('fs');

const path = require('path');
const { async } = require('rxjs');

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

fastify.get('/', async (req, res) => {
	return await res.view('index', { title: 'Задача 30080' })
});


fastify.get('/users', (req, res) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}

		if(req.query.term)
		{
			const result = JSON.parse(data).filter((elem)=> elem.name.toLowerCase().search(req.query.term.toLowerCase()) !== -1);
			res.send(result);
		}
		else
		{
			res.send(data);
		}

	})
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
