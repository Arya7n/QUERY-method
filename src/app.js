import express from 'express';
import { errorHandler, notFoundHandler } from './shared/middleware/errorHandler.js';
import healthRoutes from './modules/health/health.routes.js';
import productsRoutes from './modules/products/products.routes.js';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({
    name: 'query-method-api',
    description: 'Modular monolith demonstrating HTTP QUERY (RFC 10008)',
    endpoints: {
      health: 'GET /health',
      products: {
        query: 'QUERY /api/products',
        getById: 'GET /api/products/:id',
      },
    },
  });
});

app.use('/health', healthRoutes);
app.use('/api/products', productsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
