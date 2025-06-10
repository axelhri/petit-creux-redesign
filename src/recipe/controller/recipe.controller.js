import * as db from "../../config/db.config.js";

const create = (title, description, image, eaters, category, cookId) => {
  return db.query("CALL create_recipe($1, $2, $3, $4, $5, $6)", [
    title,
    description,
    image,
    eaters,
    category,
    cookId,
    null,
  ]);
};

export { create };
