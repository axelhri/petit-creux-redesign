import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import UploadImage from "../../middlewares/uploadImage.js";

const update = async (req, res) => {
  const { id } = req.params;
  const { cook_name, cook_email, cook_password, cook_bio } = req.body;

  const {
    rows: [cook],
  } = await CookController.getCook(id);

  if (!cook) {
    throw new NotFoundError(`Aucun utilisateur trouvé avec l'id : ${id}`);
  }

  if (req.cook.cook_id !== cook.cook_id) {
    throw new UnauthorizedError("Vous ne pouvez pas modifier ce compte.");
  }

  let imageUrl = cook.cook_profile_picture;

  if (req.file) {
    try {
      imageUrl = await UploadImage(req.file, "user-profiles");
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  const updatedData = {
    name: cook_name || cook.cook_name,
    email: cook_email || cook.cook_email,
    password: cook_password
      ? await bcrypt.hash(cook_password, 10)
      : cook.cook_password,
    bio: cook_bio || cook.cook_bio,
    cook_profile_picture: imageUrl,
  };

  const updatedCook = await CookController.editCook(id, updatedData);

  res.status(StatusCodes.OK).json({ cook: updatedCook });
};

export default update;
