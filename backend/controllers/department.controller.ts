import { Request, Response, NextFunction } from "express";
import * as service from "../services/department.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const dept = await service.createDepartment(req.body.name);
    res.status(201).json({ success: true, data: dept });
  } catch (err) { next(err); }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const depts = await service.listDepartments();
    res.json({ success: true, data: depts });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const dept = await service.updateDepartment(Number(req.params.id), req.body.name);
    res.json({ success: true, data: dept });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteDepartment(Number(req.params.id));
    res.json({ success: true, message: "Department deleted" });
  } catch (err) { next(err); }
}
