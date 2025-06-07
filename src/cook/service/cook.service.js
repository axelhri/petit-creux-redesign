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

const edit = async (req, res) => {
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

export { register, login, get, edit, remove };
