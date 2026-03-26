import { Router } from "express";
import * as ctrl from "../controllers/salary.controller";
import { validate } from "../middlewares/validate";
import { createSalarySchema } from "../validations/salary.validation";

const router = Router();

router.post("/", validate(createSalarySchema), ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

export default router;
