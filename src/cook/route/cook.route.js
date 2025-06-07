import express from "express";
const router = express.Router();

import * as CookService from "../service/cook.service.js";
import validate from "../../middlewares/validation.js";
import { CookSchema } from "../schema/cook.schema.js";

router.post(
  "/register",
  validate({ bodySchema: CookSchema }),
  CookService.register
);

export default router;
