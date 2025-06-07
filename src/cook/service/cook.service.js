import * as CookController from "../controller/cook.controller.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { cook_name, cook_email, cook_password, cook_profile_picture } =
    req.body;

  const {
    rows: [Cook],
  } = await CookController.register(
    cook_name,
    cook_email,
    cook_password,
    cook_profile_picture
  );
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Inscription réussie.", Cook });
};

export { register };
