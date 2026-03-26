import { z } from "zod";

export const createSalarySchema = z.object({
  employee_id: z.number().int().positive("Employee ID is required"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
  working_days: z.number().int().min(1).max(31),
  hours_per_day: z.number().int().min(1).max(24).default(8),
  basic_salary: z.number().min(0),
  incentive: z.number().min(0).default(0),
  arrears: z.number().min(0).default(0),
  ta_da: z.number().min(0).default(0),
  bonus: z.number().min(0).default(0),
  leaves_taken: z.number().int().min(0).default(0),
  ot_hours: z.number().min(0).default(0),
  professional_tax: z.number().min(0).default(0),
  advance_taken: z.number().min(0).default(0),
  additional_advance: z.number().min(0).default(0),
  advance_deducted: z.number().min(0).default(0),
  extra_fine: z.number().min(0).default(0),
  leave_penalty: z.number().min(0).default(0),
  time_penalty: z.number().min(0).default(0),
});
