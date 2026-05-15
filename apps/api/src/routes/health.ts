import type { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (_req, _reply) => {
    return {
      status: 'ok',
      service: 'finsse-agent',
      timestamp: new Date().toISOString(),
    };
  });
};
