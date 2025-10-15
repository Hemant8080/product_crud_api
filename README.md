## Product CRUD API (Node.js + MSSQL)

This repository contains a simple Node.js + Express CRUD API that uses Microsoft SQL Server as the database. It implements product management endpoints and a clean modular structure to demonstrate common backend patterns (controllers, models, routes, config).

### What this project contains
- `app.js` - application entrypoint, middleware and route mounting
- `config/dbConfig.js` - mssql connection helper (reads `.env`)
- `routes/` - Express route definitions (e.g. `productRoutes.js`)
- `controllers/` - request handlers (validate + call models)
- `models/` - database logic using the `mssql` package
- `.env` - environment variables (not committed normally)

### Prerequisites
- Node.js v16+ (or compatible)
- npm
- Microsoft SQL Server (local or remote) with a database (example name used: `ProductDB`)
- Optional: SQL Server Management Studio or Azure Data Studio for DB inspection

### Environment variables
Create a `.env` file in the project root (example):

```
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_password
# For a named instance use either:
# DB_SERVER=localhost\SQLEXPRESS
# or DB_SERVER=localhost and DB_INSTANCE=SQLEXPRESS (see troubleshooting)
DB_SERVER=localhost\SQLEXPRESS
DB_DATABASE=ProductDB
```

Note: if you're connecting to a named SQL Server instance on Windows, you may need to ensure TCP/IP is enabled and the SQL Server Browser service is running.

### Install and run
1. Install dependencies:

```powershell
npm install
```

2. Start in development mode:

```powershell
npm run dev
```

The server will start on the port in `.env` (default 5000). You should see:

```
Server running on port 5000
```

### Database schema (Products)
Example SQL to create the `Products` table used by the app. Run this in your `ProductDB`:

```sql
CREATE TABLE Products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(255) NOT NULL,
  description NVARCHAR(1000) NULL,
  price FLOAT NOT NULL,
  stock INT NULL DEFAULT 0,
  created_at DATETIME2 DEFAULT SYSDATETIME()
);
```

If you already have a `Products` table without `description` or `stock`, add them with:

```sql
ALTER TABLE Products ADD description NVARCHAR(1000) NULL, stock INT NULL;
```

### Endpoints
- POST /products — Create a product
  - Required body: `{ "name": "...", "price": 12.34 }`
  - Optional: `description`, `stock`
  - Returns: 201 Created with the inserted product object

- GET /products — Get all products
  - Returns: array of products

- GET /products/:id — Get a product by id

- PUT /products/:id — Update a product (accepts `name`, `description`, `price`, `stock`)

- DELETE /products/:id — Delete a product

Example POST body (JSON, Content-Type: application/json):

```json
{
  "name": "Wireless mouse",
  "description": "Compact, silent",
  "price": 29.99,
  "stock": 50
}
```

### Validation & responses
- Request body is validated in routes for required fields (e.g. `name`, `price`).
- Bad JSON will return 400 with a helpful message (the app includes a parse-error handler).
- DB errors return 500; unique constraint or validation errors return 400 where applicable.

### Postman / testing notes
- Use raw → JSON in Postman and ensure keys and strings use double quotes.
- If you see `Invalid JSON payload` or "Expected double-quoted property name" errors, your JSON is malformed (single quotes, trailing commas, or invisible characters).
- If you get database connection timeouts with a named instance like `localhost\SQLEXPRESS`:
  - Ensure SQL Server instance is running
  - Enable TCP/IP in SQL Server Configuration Manager
  - Start SQL Server Browser service or use a fixed port and connect via `DB_SERVER=localhost,1433`

### Troubleshooting common issues
- Cannot connect to instance: verify `DB_SERVER` value, instance name, and network/TCP settings.
- 500 when inserting price null: ensure your request body includes `price` as a number (no quotes) and that controller passes arguments in correct order to the model.
- Description or stock not saved: ensure the `Products` table includes those columns. See the `ALTER TABLE` statement above.

### Next improvements (suggested)
- Add request/response logging (morgan) and structured error handling
- Add unit/integration tests for the API (jest / supertest)
- Add migrations (e.g., with knex or a migration tool) to manage DB schema
- Add authentication and authorization for protected endpoints

---

If you want, I can also add a small `seed.js` script to insert sample products and a `/health` endpoint that returns DB connectivity and counts.
