import config from '../../config/env.js';
import { AppError } from '../errors/AppError.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
}

export function errorHandler(err, req, res, _next) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';
  const message = err instanceof AppError ? err.message : 'An unexpected error occurred';

  if (config.isDev && !(err instanceof AppError)) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      ...(config.isDev && !(err instanceof AppError) && { stack: err.stack }),
    },
  });
}
