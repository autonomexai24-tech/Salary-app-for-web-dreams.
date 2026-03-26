import prisma from "../config/database";
import { ApiError } from "../middlewares/errorHandler";

export async function getSettings() {
  let settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (!settings) {
    settings = await prisma.settings.create({
      data: { id: 1, company_name: "My Company", company_address: "" },
    });
  }
  return settings;
}

export async function updateSettings(data: {
  company_name?: string;
  company_address?: string;
  logo_url?: string | null;
}) {
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (!settings) throw new ApiError(404, "Settings not found");

  return prisma.settings.update({
    where: { id: 1 },
    data,
  });
}
