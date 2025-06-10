import * as db from "../../config/db.config.js";

const createIngredient = (name, quantity, unit, recipeId) => {
  return db.query("CALL create_ingredient($1, $2, $3, $4, $5)", [
    name,
    quantity,
    unit,
    recipeId,
    null,
  ]);
};

export { createIngredient };
