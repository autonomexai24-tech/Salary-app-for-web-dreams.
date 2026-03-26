import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required").max(100),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required").max(100),
});
