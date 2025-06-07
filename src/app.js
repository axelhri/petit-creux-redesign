import express from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();

import errorHandler from "./middlewares/error-handler.middleware.js";
import notFound from "./middlewares/not-found.middleware.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>Petit-Creux API</h1>");
});

app.use(notFound);
app.use(errorHandler);

export default app;
