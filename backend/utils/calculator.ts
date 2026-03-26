// ─────────────────────────────────────────────────
// Salary Calculator — Pure functions, no side effects
// ─────────────────────────────────────────────────

export interface SalaryInput {
  basic_salary: number;
  working_days: number;
  hours_per_day: number;
  ot_hours: number;
  incentive: number;
  arrears: number;
  ta_da: number;
  bonus: number;
  professional_tax: number;
  advance_deducted: number;
  extra_fine: number;
  leave_penalty: number;
  time_penalty: number;
}

export interface SalaryComputed {
  salary_per_day: number;
  salary_per_hour: number;
  ot_pay: number;
  gross_salary: number;
  total_deductions: number;
  net_salary: number;
}

/**
 * Calculate all derived salary values.
 * All math is done using standard JS numbers, rounded to 2 decimal places.
 */
export function calculateSalary(input: SalaryInput): SalaryComputed {
  const {
    basic_salary,
    working_days,
    hours_per_day,
    ot_hours,
    incentive,
    arrears,
    ta_da,
    bonus,
    professional_tax,
    advance_deducted,
    extra_fine,
    leave_penalty,
    time_penalty,
  } = input;

  // Step 1 — Per-unit rates
  const salary_per_day = round(basic_salary / working_days);
  const salary_per_hour = round(salary_per_day / hours_per_day);
  const ot_pay = round(ot_hours * salary_per_hour);

  // Step 2 — Gross
  const gross_salary = round(
    basic_salary + incentive + arrears + ta_da + bonus + ot_pay
  );

  // Step 3 — Deductions
  const total_deductions = round(
    professional_tax + advance_deducted + extra_fine + leave_penalty + time_penalty
  );

  // Step 4 — Net
  const net_salary = round(gross_salary - total_deductions);

  return {
    salary_per_day,
    salary_per_hour,
    ot_pay,
    gross_salary,
    total_deductions,
    net_salary,
  };
}

/** Round to 2 decimal places */
function round(n: number): number {
  return Math.round(n * 100) / 100;
}
