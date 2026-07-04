import { requireJsonContentType } from '../middleware/validateContentType.js';

/**
 * Registers a route handler for the HTTP QUERY method (RFC 10008).
 * Express does not ship with router.query(), so we match QUERY via router.all()
 * and skip non-QUERY requests to the next route.
 */
export function query(router, path, ...handlers) {
  router.all(path, (req, res, next) => {
    if (req.method !== 'QUERY') {
      return next('route');
    }
    next();
  }, requireJsonContentType, ...handlers);
}
