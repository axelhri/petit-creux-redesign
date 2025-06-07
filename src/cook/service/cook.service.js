import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { cook_name, cook_email, cook_password, cook_profile_picture } =
    req.body;

  const hashedPassword = await bcrypt.hash(cook_password, 10);

  const {
    rows: [Cook],
  } = await CookController.register(
    cook_name,
    cook_email,
    hashedPassword,
    cook_profile_picture
  );

  const token = jwt.sign(Cook, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Inscription réussie.", Cook, token });
};

const login = async (req, res) => {
  const { cook_email, cook_password } = req.body;

  if (!cook_email || !cook_password) {
    throw new BadRequestError("Veuillez fournir un email et un mot de passe.");
  }

  const result = await CookController.login(cook_email);

  if (result.rowCount === 0) {
    throw new BadRequestError("Email ou mot de passe incorrect.");
  }

  const cook = result.rows[0];
  const isMatch = await bcrypt.compare(cook_password, cook.cook_password);

  if (!isMatch) {
    throw new BadRequestError("Email ou mot de passe incorrect.");
  }

  const token = jwt.sign(cook, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.OK).json({
    message: "Connexion réussie.",
    token,
  });
};

export { register, login };
