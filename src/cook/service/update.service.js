import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const update = async (req, res) => {
  const { id } = req.params;
  const {
    cook_name,
    cook_email,
    cook_password,
    cook_profile_picture,
    cook_bio,
  } = req.body;

  const {
    rows: [cook],
  } = await CookController.getCook(id);

  if (!cook) {
    throw new NotFoundError(`Aucun utilisateur trouvé avec l'id : ${id}`);
  }

  if (req.cook.cook_id !== cook.cook_id) {
    throw new UnauthorizedError("Vous ne pouvez pas modifier ce compte.");
  }

  const updatedData = {
    name: cook_name || cook.cook_name,
    email: cook_email || cook.cook_email,
    password: cook_password
      ? await bcrypt.hash(cook_password, 10)
      : cook.cook_password,
    profile_picture: cook_profile_picture || cook.cook_profile_picture,
    bio: cook_bio || cook.cook_bio,
  };

  const updatedCook = await CookController.editCook(id, updatedData);

  res.status(StatusCodes.OK).json({ cook: updatedCook });
};

export default update;
