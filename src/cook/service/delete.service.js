import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";

const remove = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [cook],
  } = await CookController.getCook(id);

  if (!cook) {
    throw new NotFoundError("Utilisateur introuvable");
  }

  if (req.cook.cook_id !== cook.cook_id) {
    throw new UnauthorizedError("Vous ne pouvez pas supprimer ce compte.");
  }

  const deleteCook = await CookController.deleteCook(id);

  res.status(StatusCodes.OK).json({
    message: "Utilisateur supprimé avec succès",
    deleteCook,
  });
};

export default remove;
