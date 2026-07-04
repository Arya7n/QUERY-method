import { products } from './products.data.js';
import { AppError } from '../../shared/errors/AppError.js';

const SORT_FIELDS = new Set(['name', 'price', 'rating', 'category']);

function applyFilters(items, { category, price, search }) {
  let result = [...items];

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (price?.min != null) {
    result = result.filter((p) => p.price >= price.min);
  }

  if (price?.max != null) {
    result = result.filter((p) => p.price <= price.max);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(term));
  }

  return result;
}

function applySort(items, sort) {
  if (!sort) return items;

  const descending = sort.startsWith('-');
  const field = descending ? sort.slice(1) : sort;

  if (!SORT_FIELDS.has(field)) {
    throw new AppError(`Invalid sort field: ${field}`, 400, 'INVALID_SORT');
  }

  return [...items].sort((a, b) => {
    const left = a[field];
    const right = b[field];

    if (left < right) return descending ? 1 : -1;
    if (left > right) return descending ? -1 : 1;
    return 0;
  });
}

function applyPagination(items, { limit, offset }) {
  const safeOffset = Math.max(0, offset ?? 0);
  const safeLimit = Math.min(100, Math.max(1, limit ?? 20));
  const paginated = items.slice(safeOffset, safeOffset + safeLimit);

  return {
    data: paginated,
    meta: {
      total: items.length,
      limit: safeLimit,
      offset: safeOffset,
      count: paginated.length,
    },
  };
}

export function queryProducts(body = {}) {
  const filtered = applyFilters(products, body);
  const sorted = applySort(filtered, body.sort);
  return applyPagination(sorted, body);
}

export function getProductById(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new AppError(`Product ${id} not found`, 404, 'PRODUCT_NOT_FOUND');
  }
  return product;
}
