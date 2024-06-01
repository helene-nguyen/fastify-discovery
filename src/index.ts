//~ Import modules
import 'dotenv/config';
import Pino from 'pino';
import pkg from 'pino-multi-stream';
const { multistream } = pkg;
// import { DateTime } from 'luxon';

// const dateNow = DateTime.now()
// const date = DateTime.fromISO(dateNow)


const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 35,
  debug: 10,
};

const streams = [
  { stream: Pino.pino.destination('./src/app.log') }, // Fichier log
  { stream: Pino.pino.destination(1)}, // Console avec pino-pretty (1 : stdout, 2: stderr)
];

const transport = multistream(streams);

const logger = Pino.pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'debug', // Niveau de log minimum
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: Pino.stdTimeFunctions.isoTime,
    customLevels: levels,
    useOnlyCustomLevels: true,
  },
  transport
);

const attribute = "attribute";

// Exemple de log avec le niveau personnalisé 'emerg'
logger.emerg({ attribute }, 'This is an emergency log');

logger.info({ "attribute": attribute }, 'Info');
// logger.fatal('fatal');
// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.debug('debug');
// logger.trace('trace');
// logger.notice('notice');

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
