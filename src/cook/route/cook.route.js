import express from "express";
const router = express.Router();

import * as CookService from "../service/cook.service.js";
import validate from "../../middlewares/validation.js";
import { CookSchema, LoginSchema } from "../schema/cook.schema.js";

router.post(
  "/register",
  validate({ bodySchema: CookSchema }),
  CookService.register
);

router.post("/login", validate({ bodySchema: LoginSchema }), CookService.login);

router.get("/:id", CookService.get);

export default router;
