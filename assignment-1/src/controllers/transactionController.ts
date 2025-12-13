import { Request, Response } from "express";
import Transaction from "../models/Transaction";

// ===== CREATE: สร้าง Transaction ใหม่ =====
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, amount, description, date } = req.body;

    const transaction = new Transaction({
      type,
      amount,
      description,
      date: date || new Date(),
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: savedTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ===== READ ALL: ดึง Transaction ทั้งหมด (ที่ยังไม่ถูกลบ) =====
export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query Parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // สร้าง Filter
    const filter: any = { deletedAt: null };

    // Filter ตาม type
    if (type && ["income", "expense"].includes(type)) {
      filter.type = type;
    }

    // Filter ตาม date range
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // คำนวณ skip
    const skip = (page - 1) * limit;

    // Query
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    // นับจำนวนทั้งหมด
    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ===== READ ONE: ดึง Transaction ตาม ID =====
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({ _id: id, deletedAt: null });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ===== UPDATE: แก้ไข Transaction =====
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, amount, description, date } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, deletedAt: null }, // เงื่อนไข: ต้องยังไม่ถูกลบ
      { type, amount, description, date },
      { new: true, runValidators: true } // new: true = return ข้อมูลใหม่
    );

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ===== SOFT DELETE: ลบแบบ Soft Delete =====
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }, // ใส่วันที่ลบ แทนการลบจริง
      { new: true }
    );

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// ===== RESTORE: กู้คืน Transaction ที่ถูกลบ =====
export const restoreTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, deletedAt: { $ne: null } }, // หาที่ถูกลบแล้ว
      { deletedAt: null }, // เอา deletedAt ออก
      { new: true }
    );

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Deleted transaction not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Transaction restored successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to restore transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};