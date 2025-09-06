import * as RecipeController from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";
import UploadImage from "../../middlewares/uploadImage.js";

const create = async (req, res) => {
  const {
    recipe_title,
    recipe_description,
    recipe_eaters,
    recipe_category,
    ingredients,
  } = req.body;

  let recipe_image;

  if (req.file) {
    try {
      recipe_image = await UploadImage(req.file, "recipes-images");
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  const {
    rows: [recipe],
  } = await RecipeController.createRecipe(
    recipe_title,
    recipe_description,
    recipe_image,
    recipe_eaters,
    recipe_category,
    req.cook.cook_id,
    ingredients
  );

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Création réussie.", recipe });
};

export default create;
