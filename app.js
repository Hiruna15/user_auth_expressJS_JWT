import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import connectDB from "./config/db.js";
import errorHandlereMiddleware from "./middlewares/errorHandlere.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandlereMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to the database");
    app.listen(PORT, () => {
      console.log(`server is running on port number ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
