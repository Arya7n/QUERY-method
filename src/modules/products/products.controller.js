import { getProductById, queryProducts } from './products.service.js';

export function queryProductsHandler(req, res) {
  const result = queryProducts(req.body);

  res.set('Cache-Control', 'public, max-age=60');
  res.json(result);
}

export function getProductHandler(req, res) {
  const product = getProductById(req.params.id);
  res.json(product);
}
