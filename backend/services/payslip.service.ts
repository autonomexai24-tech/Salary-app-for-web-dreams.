import prisma from "../config/database";
import { ApiError } from "../middlewares/errorHandler";

export async function generatePayslip(salary_id: number) {
  // Fetch salary with employee and department
  const salary = await prisma.salary.findUnique({
    where: { id: salary_id },
    include: { employee: { include: { department: true } } },
  });
  if (!salary) throw new ApiError(404, "Salary record not found");

  // Fetch company settings
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });

  // Build the permanent snapshot
  const snapshot = {
    employee: {
      id: salary.employee.id,
      name: `${salary.employee.first_name} ${salary.employee.last_name}`,
      email: salary.employee.email,
      phone: salary.employee.phone,
      department: salary.employee.department?.name || "N/A",
    },
    salary: {
      month: salary.month,
      year: salary.year,
      working_days: salary.working_days,
      hours_per_day: salary.hours_per_day,
      working_hours: salary.working_hours,
      basic_salary: salary.basic_salary.toString(),
      incentive: salary.incentive.toString(),
      arrears: salary.arrears.toString(),
      ta_da: salary.ta_da.toString(),
      bonus: salary.bonus.toString(),
      leaves_taken: salary.leaves_taken,
      ot_hours: salary.ot_hours.toString(),
      professional_tax: salary.professional_tax.toString(),
      advance_taken: salary.advance_taken.toString(),
      additional_advance: salary.additional_advance.toString(),
      advance_deducted: salary.advance_deducted.toString(),
      extra_fine: salary.extra_fine.toString(),
      leave_penalty: salary.leave_penalty.toString(),
      time_penalty: salary.time_penalty.toString(),
      salary_per_day: salary.salary_per_day.toString(),
      salary_per_hour: salary.salary_per_hour.toString(),
      ot_pay: salary.ot_pay.toString(),
      gross_salary: salary.gross_salary.toString(),
      total_deductions: salary.total_deductions.toString(),
      net_salary: salary.net_salary.toString(),
    },
    company: {
      name: settings?.company_name || "My Company",
      address: settings?.company_address || "",
      logo_url: settings?.logo_url || null,
    },
    generated_at: new Date().toISOString(),
  };

  // Create payslip + lock salary in a transaction
  const [payslip] = await prisma.$transaction([
    prisma.payslip.create({
      data: {
        employee_id: salary.employee_id,
        salary_id: salary.id,
        generated_data: snapshot,
      },
    }),
    prisma.salary.update({
      where: { id: salary.id },
      data: { is_locked: true },
    }),
  ]);

  return payslip;
}

export async function getPayslip(id: number) {
  const payslip = await prisma.payslip.findUnique({
    where: { id },
  });
  if (!payslip) throw new ApiError(404, "Payslip not found");
  return payslip;
}
