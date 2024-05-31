//~ Import modules
import { IncomingMessage, Server, ServerResponse } from 'http';
import { RouteOptions } from 'fastify';
import { sendMessage } from './controller.js';

interface IBody {}

// Routes list
const routes: [
  RouteOptions<
    Server,
    IncomingMessage,
    ServerResponse,
    { Body?: IBody; }
  >
] = [
  {
    method: 'GET',
    url: '/',
    handler: sendMessage,
    // schema: {
    //   body: {}
    // }
  }
];

export default routes;
