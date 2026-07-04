# query-method-api

A small Node.js + Express project experimenting with the new HTTP **QUERY** method ([RFC 10008](https://www.rfc-editor.org/rfc/rfc10008.html)).

QUERY is for read-only requests that need a body — like search or filtering — without using POST.

## Try it

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`.

## Test the QUERY endpoint

Send a `QUERY` request to `/api/products` with a JSON body:

```json
{
  "category": "running",
  "price": { "min": 100, "max": 200 },
  "sort": "-rating"
}
```

**curl (Windows — use `curl.exe`)**

```bash
curl.exe -X QUERY "http://localhost:3000/api/products" -H "Content-Type: application/json" -d "{\"category\":\"running\"}"
```

**PowerShell**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method QUERY -ContentType "application/json" -Body '{"category":"running"}'
```

In Postman or similar tools, set the method to `QUERY`, add `Content-Type: application/json`, and send raw JSON in the body.

## What we built

- Express API with a modular structure (`health`, `products` modules)
- `QUERY /api/products` — filter products by category, price, name, sort, and pagination
- `GET /api/products/:id` — fetch a single product

Express doesn't support QUERY out of the box, so we added a small helper in `src/shared/http/queryRoute.js` to register QUERY routes.

## Why it's useful

- Send complex filters in the body instead of long URLs
- Semantically a read operation (safe + idempotent), unlike POST
- Better fit for search, GraphQL-style reads, and heavy filtering

## Learn more

[RFC 10008 — The HTTP QUERY Method](https://www.rfc-editor.org/rfc/rfc10008.html)
