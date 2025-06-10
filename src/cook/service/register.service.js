import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UploadImage from "../../middlewares/uploadImage.js";

const register = async (req, res) => {
  const { cook_name, cook_email, cook_password } = req.body;

  let imageUrl =
    "https://res.cloudinary.com/dsoqmhreg/image/upload/v1734000065/avatar_whstza.png";

  if (req.file) {
    try {
      imageUrl = await UploadImage(req.file, "user-profiles");
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
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
    imageUrl
  );

  const token = jwt.sign(cook, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Inscription réussie.", cook, token });
};

export default register;
