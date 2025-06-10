import { getRecipe } from "../controller/recipe.controller.js";
import { StatusCodes } from "http-status-codes";

const get = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [recipe],
  } = await getRecipe(id);

  if (!recipe) {
    throw new NotFoundError("Recette introuvable");
  }

  res.status(StatusCodes.OK).json({ recipe });
};

export default get;
