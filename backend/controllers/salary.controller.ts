import { Request, Response, NextFunction } from "express";
import * as service from "../services/salary.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const salary = await service.createSalary(req.body);
    res.status(201).json({ success: true, data: salary });
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.listSalaries(req.query as Record<string, unknown>);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const salary = await service.getSalary(Number(req.params.id));
    res.json({ success: true, data: salary });
  } catch (err) { next(err); }
}
