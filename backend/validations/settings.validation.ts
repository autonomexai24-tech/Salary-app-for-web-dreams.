import { z } from "zod";

export const updateSettingsSchema = z.object({
  company_name: z.string().min(1).max(200).optional(),
  company_address: z.string().max(500).optional(),
  logo_url: z.string().url().nullable().optional(),
});
