import prisma from "../config/database";
import { ApiError } from "../middlewares/errorHandler";

export async function createDepartment(name: string) {
  const existing = await prisma.department.findUnique({ where: { name } });
  if (existing) throw new ApiError(409, "Department already exists");

  return prisma.department.create({ data: { name } });
}

export async function listDepartments() {
  return prisma.department.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
  });
}

export async function updateDepartment(id: number, name: string) {
  const dept = await prisma.department.findUnique({ where: { id } });
  if (!dept || !dept.is_active) throw new ApiError(404, "Department not found");

  return prisma.department.update({ where: { id }, data: { name } });
}

export async function deleteDepartment(id: number) {
  const dept = await prisma.department.findUnique({ where: { id } });
  if (!dept || !dept.is_active) throw new ApiError(404, "Department not found");

  // Soft delete — employees keep their records, department_id stays
  return prisma.department.update({
    where: { id },
    data: { is_active: false },
  });
}
