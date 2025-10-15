const express = require("express");
const productController = require("../controllers/productController");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Valid price is required"),
  ],
  productController.createProduct
);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
