import * as RecipeController from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";

const bookmark = async (req, res) => {
  const cookId = req.cook.cook_id;
  const recipeId = req.params.id;

  const result = await RecipeController.bookmark(cookId, recipeId);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Recette ajouté aux favoris", result });
};

export default bookmark;
