import prisma from "../config/database";
import { ApiError } from "../middlewares/errorHandler";
import { parsePagination, paginatedResponse } from "../utils/pagination";

interface CreateEmployeeData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  department_id?: number | null;
  dob?: string | null;
  joining_date?: string | null;
}

export async function createEmployee(data: CreateEmployeeData) {
  const existing = await prisma.employee.findUnique({ where: { email: data.email } });
  if (existing) throw new ApiError(409, "Employee with this email already exists");

  return prisma.employee.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      department_id: data.department_id ?? null,
      dob: data.dob ? new Date(data.dob) : null,
      joining_date: data.joining_date ? new Date(data.joining_date) : null,
    },
    include: { department: true },
  });
}

export async function listEmployees(query: Record<string, unknown>) {
  const pagination = parsePagination(query);

  const where = {
    is_active: true,
    ...(query.department_id
      ? { department_id: Number(query.department_id) }
      : {}),
    ...(query.search
      ? {
          OR: [
            { first_name: { contains: String(query.search), mode: "insensitive" as const } },
            { last_name: { contains: String(query.search), mode: "insensitive" as const } },
            { email: { contains: String(query.search), mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.employee.findMany({
      where,
      include: { department: true },
      orderBy: { created_at: "desc" },
      skip: pagination.skip,
      take: pagination.take,
    }),
    prisma.employee.count({ where }),
  ]);

  return paginatedResponse(data, total, pagination);
}

export async function getEmployee(id: number) {
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { department: true },
  });
  if (!employee || !employee.is_active) throw new ApiError(404, "Employee not found");
  return employee;
}

export async function deleteEmployee(id: number) {
  const employee = await prisma.employee.findUnique({ where: { id } });
  if (!employee || !employee.is_active) throw new ApiError(404, "Employee not found");

  return prisma.employee.update({
    where: { id },
    data: { is_active: false },
  });
}
