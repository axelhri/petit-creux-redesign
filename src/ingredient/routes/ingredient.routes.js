import express from "express";
const router = express.Router();

import IngredientSchema from "../schema/ingredient.schema.js";
import validate from "../../middlewares/validation.js";

import create from "../service/create.service.js";

router.post("/", validate({ bodySchema: IngredientSchema }), create);

export default router;
