import * as RecipeController from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";

const create = async (req, res) => {
  const {
    recipe_title,
    recipe_description,
    recipe_image,
    recipe_eaters,
    recipe_category,
  } = req.body;

  const {
    rows: [recipe],
  } = await RecipeController.create(
    recipe_title,
    recipe_description,
    recipe_image,
    recipe_eaters,
    recipe_category,
    req.cook.cook_id
  );

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Création réussie.", recipe });
};

export default create;
