import mongoose, { Document, Schema } from "mongoose";

// กำหนด Type สำหรับ Transaction
export interface ITransaction extends Document {
  type: "income" | "expense";
  amount: number;
  description: string;
  date: Date;
  deletedAt: Date | null; // สำหรับ Soft Delete
  createdAt: Date;
  updatedAt: Date;
}

// สร้าง Schema (โครงสร้างข้อมูล)
const transactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["income", "expense"], // รับแค่ 2 ค่านี้
      required: [true, "Type is required"], // บังคับใส่
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be positive"], // ต้องเป็นบวก
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true, // ตัด space หน้า-หลัง
    },
    date: {
      type: Date,
      default: Date.now, // ถ้าไม่ใส่ ใช้เวลาปัจจุบัน
    },
    deletedAt: {
      type: Date,
      default: null, // null = ยังไม่ถูกลบ
    },
  },
  {
    timestamps: true, // สร้าง createdAt, updatedAt อัตโนมัติ
  }
);

// สร้าง Model
const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;