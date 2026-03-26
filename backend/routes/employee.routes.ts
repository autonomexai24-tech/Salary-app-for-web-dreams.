import { Router } from "express";
import * as ctrl from "../controllers/employee.controller";
import { validate } from "../middlewares/validate";
import { createEmployeeSchema } from "../validations/employee.validation";

const router = Router();

router.post("/", validate(createEmployeeSchema), ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.delete("/:id", ctrl.remove);

export default router;
