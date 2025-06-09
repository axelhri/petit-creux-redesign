import express from "express";
const router = express.Router();

import CookSchema from "../schema/cook.schema.js";
import LoginSchema from "../schema/login.schema.js";
import UpdateSchema from "../schema/update.schema.js";

import validate from "../../middlewares/validation.js";
import auth from "../../middlewares/auth.js";
import { multerUploads } from "../../middlewares/multer.js";

import register from "../service/register.service.js";
import login from "../service/login.service.js";
import get from "../service/get.service.js";
import update from "../service/update.service.js";
import remove from "../service/delete.service.js";

router.post(
  "/register",
  multerUploads.single("image"),
  validate({ bodySchema: CookSchema }),
  register
);

router.post("/login", validate({ bodySchema: LoginSchema }), login);

router.get("/:id", get);

router.put(
  "/:id",
  multerUploads.single("image"),
  validate({ bodySchema: UpdateSchema }),
  auth,
  update
);

router.delete("/:id", auth, remove);

export default router;
