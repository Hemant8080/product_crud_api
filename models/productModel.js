const { connection, sql } = require("../config/dbConfig");

class ProductModel {
  static async getAll() {
    const pool = await connection();
    const result = await pool.request().query("SELECT * FROM Products");
    return result.recordset;
  }

  static async getById(id) {
    const pool = await connection();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Products WHERE id = @id");
    return result.recordset[0];
  }

  static async create(name, description, price, stock) {
    const pool = await connection();

    const descVal = description !== undefined ? description : null;
    const stockVal = stock !== undefined ? stock : null;

    const result = await pool.request()
      .input("name", sql.VarChar(255), name)
      .input("description", sql.VarChar(1000), descVal)
      .input("price", sql.Float, price)
      .input("stock", sql.Int, stockVal)
      .query(
        "INSERT INTO Products (name, description, price, stock) OUTPUT INSERTED.* VALUES (@name, @description, @price, @stock)"
      );

    return result.recordset[0];
  }

  static async update(id, name, description, price, stock) {
    const pool = await connection();

    const descVal = description !== undefined ? description : null;
    const stockVal = stock !== undefined ? stock : null;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar(255), name)
      .input("description", sql.VarChar(1000), descVal)
      .input("price", sql.Float, price)
      .input("stock", sql.Int, stockVal)
      .query(
        "UPDATE Products SET name=@name, description=@description, price=@price, stock=@stock WHERE id=@id; SELECT * FROM Products WHERE id=@id;"
      );

    return result.recordset[0];
  }

  static async delete(id) {
    const pool = await connection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Products WHERE id=@id");
    return { message: "Product deleted successfully" };
  }
}

module.exports = ProductModel;
