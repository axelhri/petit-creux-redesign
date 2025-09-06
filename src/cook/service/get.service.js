import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";

const get = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [cook],
  } = await CookController.getCook(id);

  if (!cook) {
    throw new NotFoundError("Utilisateur introuvable");
  }

  res.status(StatusCodes.OK).json({ cook });
};

export default get;
