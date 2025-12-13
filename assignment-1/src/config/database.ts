import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    // ตรวจสอบว่ามี MONGODB_URI หรือไม่
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    // เชื่อมต่อ MongoDB
    await mongoose.connect(mongoURI);
    
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // หยุดโปรแกรมถ้าเชื่อมต่อไม่ได้
  }
};

export default connectDB;