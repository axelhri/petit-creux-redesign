import * as db from "../../config/db.config.js";

const create = (title, description, image, eaters, category, cookId) => {
  return db.query("CALL create_recipe($1, $2, $3, $4, $5, $6, $7)", [
    title,
    description,
    image,
    eaters,
    category,
    cookId,
    null,
  ]);
};

const getRecipe = (id) => {
  return db.query("SELECT * FROM Recipe WHERE recipe_id=$1", [id]);
};

const deleteRecipe = (id) => {
  return db.query("CALL delete_recipe($1)", [id]);
};

export { create, getRecipe, deleteRecipe };
