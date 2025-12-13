import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Transaction API! 🎉",
    status: "Server is running",
    endpoints: {
      transactions: "/api/transactions",
    },
  });
});

app.use("/api/transactions", transactionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();