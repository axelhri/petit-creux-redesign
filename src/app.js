import express from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
dotenv.config();

const app = express();

import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>Petit-Creux API</h1>");
});

import cook from "./cook/route/cook.route.js";
import recipe from "./recipe/routes/recipe.routes.js";
import ingredient from "./ingredient/routes/ingredient.routes.js";

app.use("/api/v1/cook", cook);
app.use("/api/v1/recipe", recipe);
app.use("/api/v1/ingredient", ingredient);

app.use(notFound);
app.use(errorHandler);

export default app;
