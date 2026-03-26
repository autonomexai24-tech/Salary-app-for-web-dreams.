import { Router } from "express";
import * as ctrl from "../controllers/department.controller";
import { validate } from "../middlewares/validate";
import { createDepartmentSchema, updateDepartmentSchema } from "../validations/department.validation";

const router = Router();

router.post("/", validate(createDepartmentSchema), ctrl.create);
router.get("/", ctrl.list);
router.put("/:id", validate(updateDepartmentSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
