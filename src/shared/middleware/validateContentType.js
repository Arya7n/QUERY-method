import { AppError } from '../errors/AppError.js';

/**
 * RFC 10008: servers MUST reject QUERY requests without a Content-Type
 * that is consistent with the request body.
 */
export function requireJsonContentType(req, _res, next) {
  const contentType = req.get('Content-Type');

  if (!contentType) {
    return next(new AppError('Content-Type header is required for QUERY requests', 400, 'MISSING_CONTENT_TYPE'));
  }

  if (!contentType.includes('application/json')) {
    return next(new AppError('Unsupported Content-Type for QUERY requests', 415, 'UNSUPPORTED_MEDIA_TYPE'));
  }

  next();
}
