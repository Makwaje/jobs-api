const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

dotenv.config();

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`));
    await connectDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

start();
