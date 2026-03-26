import { Router } from "express";
import * as ctrl from "../controllers/settings.controller";
import { validate } from "../middlewares/validate";
import { updateSettingsSchema } from "../validations/settings.validation";

const router = Router();

router.get("/", ctrl.get);
router.put("/", validate(updateSettingsSchema), ctrl.update);

export default router;
