import { getRecipe } from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";

const get = async (req, res) => {
  const { id } = req.params;

  const { rows } = await getRecipe(id);

  if (rows.length === 0) {
    throw new NotFoundError("Recette introuvable");
  }

  const {
    recipe_id,
    recipe_title,
    recipe_description,
    recipe_category,
    recipe_eaters,
  } = rows[0];

  const ingredients = rows.map(
    ({ ingredient_name, ingredient_unit, ingredient_quantity }) => ({
      ingredient_name,
      ingredient_unit,
      ingredient_quantity,
    })
  );

  const recipe = {
    recipe_id,
    recipe_title,
    recipe_description,
    recipe_category,
    recipe_eaters,
    ingredients,
  };

  res.status(StatusCodes.OK).json({ recipe });
};

export default get;
