import { z } from "zod";

export const createEmployeeSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(100),
  last_name: z.string().min(1, "Last name is required").max(100),
  phone: z.string().min(1, "Phone is required").max(20),
  email: z.string().email("Invalid email address"),
  department_id: z.number().int().positive().nullable().optional(),
  dob: z.string().datetime().optional().nullable(),
  joining_date: z.string().datetime().optional().nullable(),
});
