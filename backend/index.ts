import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";

// Routes
import departmentRoutes from "./routes/department.routes";
import employeeRoutes from "./routes/employee.routes";
import salaryRoutes from "./routes/salary.routes";
import payslipRoutes from "./routes/payslip.routes";
import settingsRoutes from "./routes/settings.routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// ── Global Middleware ──
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ── Health Check ──
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ──
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/payslips", payslipRoutes);
app.use("/api/settings", settingsRoutes);

// ── Global Error Handler ──
app.use(errorHandler);

// ── Start Server ──
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`🚀 Salary App Backend running on http://localhost:${PORT}`);
});

export default app;
