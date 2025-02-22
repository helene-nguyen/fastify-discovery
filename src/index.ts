//~ Import modules
import 'dotenv/config';
import Pino from 'pino';
const logger = Pino.pino();

import Fastify from 'fastify';
const app = Fastify({ logger: false });

import routes from './routes.js';

routes.forEach((route) => {
  app.route(route);
});
// app.get('/', function (req, res) {
//   res.send({ hello: 'world' });
// });

//~ Launch Server
const PORT = process.env.PORT ?? 3000;

app.listen({ port: Number(PORT) }, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
});
