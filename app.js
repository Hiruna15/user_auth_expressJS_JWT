import express, { json } from "express";
import "dotenv/config";
import router from "./routes/index.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/api/v1", router);

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
