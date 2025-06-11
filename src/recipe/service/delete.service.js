import * as RecipeController from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../../config/cloudinary.config.js";

const remove = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [recipe],
  } = await RecipeController.getRecipe(id);

  if (!recipe) {
    throw new NotFoundError("Recette introuvable");
  }

  if (recipe.cook_id !== req.cook.cook_id) {
    throw new UnauthorizedError("Vous ne pouvez pas supprimer cette recette.");
  }

  if (recipe.recipe_image) {
    const publicId = recipe.recipe_image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`recipes-images/${publicId}`);
  }

  const deleteRecipe = await RecipeController.deleteRecipe(id);

  res.status(StatusCodes.OK).json({
    message: "Recette supprimé avec succès",
    deleteRecipe,
  });
};

export default remove;
