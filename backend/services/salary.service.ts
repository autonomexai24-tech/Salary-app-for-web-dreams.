import prisma from "../config/database";
import { ApiError } from "../middlewares/errorHandler";
import { calculateSalary, SalaryInput } from "../utils/calculator";
import { parsePagination, paginatedResponse } from "../utils/pagination";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateSalaryData {
  employee_id: number;
  month: number;
  year: number;
  working_days: number;
  hours_per_day: number;
  basic_salary: number;
  incentive: number;
  arrears: number;
  ta_da: number;
  bonus: number;
  leaves_taken: number;
  ot_hours: number;
  professional_tax: number;
  advance_taken: number;
  additional_advance: number;
  advance_deducted: number;
  extra_fine: number;
  leave_penalty: number;
  time_penalty: number;
}

export async function createSalary(data: CreateSalaryData) {
  // Verify employee exists
  const employee = await prisma.employee.findUnique({ where: { id: data.employee_id } });
  if (!employee || !employee.is_active) throw new ApiError(404, "Employee not found");

  // Check uniqueness of (employee_id, month, year)
  const existing = await prisma.salary.findUnique({
    where: {
      employee_id_month_year: {
        employee_id: data.employee_id,
        month: data.month,
        year: data.year,
      },
    },
  });
  if (existing) throw new ApiError(409, "Salary record already exists for this employee/month/year");

  // Calculate computed values
  const input: SalaryInput = {
    basic_salary: data.basic_salary,
    working_days: data.working_days,
    hours_per_day: data.hours_per_day,
    ot_hours: data.ot_hours,
    incentive: data.incentive,
    arrears: data.arrears,
    ta_da: data.ta_da,
    bonus: data.bonus,
    professional_tax: data.professional_tax,
    advance_deducted: data.advance_deducted,
    extra_fine: data.extra_fine,
    leave_penalty: data.leave_penalty,
    time_penalty: data.time_penalty,
  };

  const computed = calculateSalary(input);
  const working_hours = data.working_days * data.hours_per_day;

  return prisma.salary.create({
    data: {
      ...data,
      working_hours,
      salary_per_day: new Decimal(computed.salary_per_day),
      salary_per_hour: new Decimal(computed.salary_per_hour),
      ot_pay: new Decimal(computed.ot_pay),
      gross_salary: new Decimal(computed.gross_salary),
      total_deductions: new Decimal(computed.total_deductions),
      net_salary: new Decimal(computed.net_salary),
    },
    include: { employee: true },
  });
}

export async function listSalaries(query: Record<string, unknown>) {
  const pagination = parsePagination(query);

  const where: Record<string, unknown> = {};
  if (query.employee_id) where.employee_id = Number(query.employee_id);
  if (query.month) where.month = Number(query.month);
  if (query.year) where.year = Number(query.year);

  const [data, total] = await Promise.all([
    prisma.salary.findMany({
      where,
      include: { employee: { select: { id: true, first_name: true, last_name: true, email: true } } },
      orderBy: { created_at: "desc" },
      skip: pagination.skip,
      take: pagination.take,
    }),
    prisma.salary.count({ where }),
  ]);

  return paginatedResponse(data, total, pagination);
}

export async function getSalary(id: number) {
  const salary = await prisma.salary.findUnique({
    where: { id },
    include: { employee: { include: { department: true } } },
  });
  if (!salary) throw new ApiError(404, "Salary record not found");
  return salary;
}
