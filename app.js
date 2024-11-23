import express from "express";
import "dotenv/config";
import router from "./routes/index.js";

const app = express();

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
});
