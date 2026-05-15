import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { invoiceRoutes } from './routes/invoice.js';
import { bookingRoutes } from './routes/booking.js';
import { healthRoutes } from './routes/health.js';

const envPort = process.env.PORT ?? '3001';
const port = parseInt(envPort, 10);

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  },
});

// ---------------------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------------------
await app.register(cors, { origin: true });
await app.register(multipart, {
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

await app.register(swagger, {
  openapi: {
    info: {
      title: 'Finsse Agent API',
      description: '财税会计 AI Agent — 发票识别 → 自动入账',
      version: '0.1.0',
    },
  },
});
await app.register(swaggerUi, { routePrefix: '/docs' });

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
await app.register(healthRoutes, { prefix: '/api/health' });
await app.register(invoiceRoutes, { prefix: '/api/invoices' });
await app.register(bookingRoutes, { prefix: '/api/bookings' });

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
try {
  await app.listen({ host: '0.0.0.0', port });
  console.log(`🚀 Finsse API  running at http://localhost:${port}`);
  console.log(`📚 API docs   at http://localhost:${port}/docs`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

export { app };
