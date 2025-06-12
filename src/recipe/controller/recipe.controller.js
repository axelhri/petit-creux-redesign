import * as db from "../../config/db.config.js";

const createRecipe = (
  title,
  description,
  image,
  eaters,
  category,
  cookId,
  ingredients
) => {
  return db.query("CALL create_recipe($1, $2, $3, $4, $5, $6, $7, $8)", [
    title,
    description,
    image,
    eaters,
    category,
    cookId,
    JSON.stringify(ingredients),
    null,
  ]);
};

const getRecipe = (id) => {
  return db.query(
    "SELECT * FROM Recipe r JOIN Ingredient i ON i.recipe_id = r.recipe_id WHERE r.recipe_id = $1",
    [id]
  );
};

const deleteRecipe = (id) => {
  return db.query("CALL delete_recipe($1)", [id]);
};

export { createRecipe, getRecipe, deleteRecipe };
