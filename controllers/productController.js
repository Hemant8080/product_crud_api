const { validationResult } = require("express-validator");
const ProductModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    // Basic validation
    const errors = validationResult(req);

    if (!name || price === undefined)
      return res.status(400).json({ message: "Name and price are required" });

  // Pass name, description, price, stock to match ProductModel.create signature
  const product = await ProductModel.create(name, description, price, stock);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
  // ProductModel.update signature is (id, name, description, price, stock)
  const updated = await ProductModel.update(req.params.id, name, description, price, stock);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductModel.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
