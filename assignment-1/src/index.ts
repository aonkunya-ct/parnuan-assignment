import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import transactionRoutes from "./routes/transactionRoutes";

// โหลดค่าจากไฟล์ .env
dotenv.config();

// สร้าง Express App
const app: Application = express();

// Middleware
app.use(express.json());

// Route ทดสอบ
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Transaction API! 🎉",
    status: "Server is running",
  });
});

// ===== เพิ่มบรรทัดนี้ =====
app.use("/api/transactions", transactionRoutes);

// กำหนด Port
const PORT = process.env.PORT || 3000;

// เริ่มต้น Server
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