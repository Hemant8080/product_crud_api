
```
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_SERVER=localhost\SQLEXPRESS
DB_DATABASE=database_name
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


### Endpoints
- POST /products — Create a product
  - Required body: `{ "name": "...", "price": 12.34 }`
  - Optional: `description`, `stock`
  

- GET /products — Get all products
  
- GET /products/:id — Get a product by id

- PUT /products/:id — Update a product

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
