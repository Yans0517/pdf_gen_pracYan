import express from "express";
import dotenv from "dotenv";
import { Logger } from "./middleware/index.js";
dotenv.config();
import cors from "cors";
import { AppRouter } from "./routes/index.js";
const app = express();
const logger = new Logger();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const port = process.env.PORT || 3000;

app.use(AppRouter);

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
  // console.log(`Server running at http://localhost:${port}`);
});
