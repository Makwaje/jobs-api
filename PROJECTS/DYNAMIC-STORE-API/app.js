require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

// async error
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
});

app.use("/api/v1/products", productsRouter);

// Products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`));

    // connectDB
    console.log("Connecting...");
    await connectDB(process.env.MONGO_URL);
    console.log("------------CONNECTED✅------------");
  } catch (error) {
    console.log(error);
    console.log("retrying...");
    await connectDB(process.env.MONGO_URL);
    console.log("------------CONNECTED✅------------");
  }
};

start();
