import express, { Application, Request, Response } from "express";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Middleware
app.use(express.json());

// Route ทดสอบ
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Transaction API! 🎉",
    status: "Server is running",
    endpoints: {
      transactions: "/api/transactions",
    },
  });
});

// API Routes
app.use("/api/transactions", transactionRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;