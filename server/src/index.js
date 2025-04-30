import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnection from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());

dbConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
