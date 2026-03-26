import { Request, Response, NextFunction } from "express";
import * as service from "../services/payslip.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payslip = await service.generatePayslip(Number(req.body.salary_id));
    res.status(201).json({ success: true, data: payslip });
  } catch (err) { next(err); }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const payslip = await service.getPayslip(Number(req.params.id));
    res.json({ success: true, data: payslip });
  } catch (err) { next(err); }
}
