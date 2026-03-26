import { Request, Response, NextFunction } from "express";
import * as service from "../services/employee.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const employee = await service.createEmployee(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.listEmployees(req.query as Record<string, unknown>);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const employee = await service.getEmployee(Number(req.params.id));
    res.json({ success: true, data: employee });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteEmployee(Number(req.params.id));
    res.json({ success: true, message: "Employee deleted" });
  } catch (err) { next(err); }
}
