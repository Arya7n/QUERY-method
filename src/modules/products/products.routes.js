import { Router } from 'express';
import { query } from '../../shared/http/queryRoute.js';
import { getProductHandler, queryProductsHandler } from './products.controller.js';

const router = Router();

// RFC 10008 QUERY — complex read-only search with a request body
query(router, '/', queryProductsHandler);

// Standard GET for single resource lookup
router.get('/:id', getProductHandler);

export default router;
