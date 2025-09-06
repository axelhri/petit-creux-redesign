import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token manquant ou invalide.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.cook = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError("Token invalide.");
  }
};

export default auth;
