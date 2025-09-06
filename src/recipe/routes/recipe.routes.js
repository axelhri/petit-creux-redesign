import express from "express";
const router = express.Router();

import RecipeSchema from "../schema/recipe.schema.js";
import validate from "../../middlewares/validation.js";
import auth from "../../middlewares/auth.js";
import { multerUploads } from "../../middlewares/multer.js";

import create from "../service/create.service.js";
import getRecipe from "../service/get.service.js";
import remove from "../service/delete.service.js";
import bookmark from "../service/bookmark.service.js";

router.post(
  "/",
  multerUploads.single("recipe_image"),
  validate({ bodySchema: RecipeSchema }),
  auth,
  create
);

router.post("/:id", auth, bookmark);

router.get("/:id", getRecipe);

router.delete("/:id", auth, remove);

export default router;
