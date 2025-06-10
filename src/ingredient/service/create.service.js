import { createIngredient } from "../controller/ingredient.controller.js";
import { StatusCodes } from "http-status-codes";

const create = async (req, res) => {
  const { ingredient_name, ingredient_quantity, ingredient_unit, recipe_id } =
    req.body;

  const {
    rows: [ingredient],
  } = await createIngredient(
    ingredient_name,
    ingredient_quantity,
    ingredient_unit,
    recipe_id
  );

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Création réussie.", ingredient });
};

export default create;
