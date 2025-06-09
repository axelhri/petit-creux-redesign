import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dataUri } from "../../middlewares/multer.js";
import cloudinary from "../../config/cloudinary.config.js";

const register = async (req, res) => {
  const { cook_name, cook_email, cook_password, cook_profile_picture } =
    req.body;

  let defaultImage =
    "https://res.cloudinary.com/dsoqmhreg/image/upload/v1734000065/avatar_whstza.png";

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
      defaultImage = cloudinaryResponse.secure_url;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Erreur lors de l'upload de l'image",
        error: error.message,
      });
    }
  }

  const hashedPassword = await bcrypt.hash(cook_password, 10);

  const {
    rows: [cook],
  } = await CookController.register(
    cook_name,
    cook_email,
    hashedPassword,
    cook_profile_picture
  );

  const token = jwt.sign(cook, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Inscription réussie.", cook, token });
};

export default register;
