import { FastifyReply, FastifyRequest } from 'fastify';

const sendMessage = (req: FastifyRequest, res: FastifyReply) => {
  res.send({ hello: "world'" });
};

export { sendMessage };
