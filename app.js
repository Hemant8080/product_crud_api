const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
