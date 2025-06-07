import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("<h1>Petit-Creux API</h1>");
});

export default app;
