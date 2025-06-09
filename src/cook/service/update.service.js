import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { dataUri } from "../../middlewares/multer.js";
import cloudinary from "../../config/cloudinary.config.js";

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

  let imageUrl = cook.imageUrl;

  if (req.file) {
    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "L'image dépasse la taille maximale autorisée de 5 MB",
      });
    }

    const file = dataUri(req.file).content;

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(file, {
        folder: "user-profiles",
      });
      imageUrl = cloudinaryResponse.secure_url;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Erreur lors de l'upload de l'image",
        error: error.message,
      });
    }
  }

  const updatedData = {
    name: cook_name || cook.cook_name,
    email: cook_email || cook.cook_email,
    password: cook_password
      ? await bcrypt.hash(cook_password, 10)
      : cook.cook_password,
    profile_picture: imageUrl || cook.cook_profile_picture,
    bio: cook_bio || cook.cook_bio,
  };

  const updatedCook = await CookController.editCook(id, updatedData);

  res.status(StatusCodes.OK).json({ cook: updatedCook });
};

export default update;
