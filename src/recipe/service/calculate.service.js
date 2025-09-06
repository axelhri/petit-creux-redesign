import * as RecipeController from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";

const calculate = async (req, res) => {
  const recipeId = req.params.id;
  const { servings } = req.query;

  if (!servings || isNaN(servings) || parseInt(servings) <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Le nombre de personnes est invalide.",
    });
  }

  try {
    const result = await RecipeController.calculateIngredients(recipeId);

    if (result.rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Recette non trouvée.",
      });
    }

    const baseServings = result.rows[0].recipe_eaters;
    const calculatedIngredients = result.rows.map((row) => ({
      name: row.ingredient_name,
      unit: row.ingredient_unit,
      quantity: (row.ingredient_quantity / baseServings) * parseInt(servings),
    }));

    res.status(StatusCodes.OK).json({
      recipeName: result.rows[0].recipe_title,
      servings: parseInt(servings),
      ingredients: calculatedIngredients,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erreur lors du calcul des ingrédients.",
    });
  }
};

export default calculate;
