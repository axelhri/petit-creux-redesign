import express from "express";
const router = express.Router();

import RecipeSchema from "../schema/recipe.schema.js";
import validate from "../../middlewares/validation.js";
import auth from "../../middlewares/auth.js";

import create from "../service/create.service.js";

router.post("/", validate({ bodySchema: RecipeSchema }), auth, create);

router.get("/:id");

router.delete("/:id");

export default router;
