import { Router } from "express";
import * as ctrl from "../controllers/payslip.controller";

const router = Router();

router.post("/", ctrl.create);
router.get("/:id", ctrl.getOne);

export default router;
