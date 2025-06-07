import express from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();

import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>Petit-Creux API</h1>");
});

import cook from "./cook/route/cook.route.js";

app.use("/api/v1/cook", cook);

app.use(notFound);
app.use(errorHandler);

export default app;
