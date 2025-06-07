import express from "express";
const router = express.Router();

import * as CookService from "../service/cook.service.js";
import validate from "../../middlewares/validation.js";
import CookSchema from "../schema/cook.schema.js";
import LoginSchema from "../schema/login.schema.js";
import UpdateSchema from "../schema/update.schema.js";
import auth from "../../middlewares/auth.js";

router.post(
  "/register",
  validate({ bodySchema: CookSchema }),
  CookService.register
);

router.post("/login", validate({ bodySchema: LoginSchema }), CookService.login);

router.get("/:id", CookService.get);

router.put(
  "/:id",
  validate({ bodySchema: UpdateSchema }),
  auth,
  CookService.edit
);

export default router;
