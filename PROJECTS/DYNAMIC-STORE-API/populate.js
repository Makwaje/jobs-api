require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    console.log("trying...");
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Connected to DB!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    start();
  }
};

start();
