import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { cook_name, cook_email, cook_password, cook_profile_picture } =
    req.body;

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
