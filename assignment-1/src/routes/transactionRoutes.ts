import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  restoreTransaction,
} from "../controllers/transactionController";

const router = Router();

// CRUD Routes
router.post("/", createTransaction);           // POST   /api/transactions
router.get("/", getAllTransactions);           // GET    /api/transactions
router.get("/:id", getTransactionById);        // GET    /api/transactions/:id
router.put("/:id", updateTransaction);         // PUT    /api/transactions/:id
router.delete("/:id", deleteTransaction);      // DELETE /api/transactions/:id
router.patch("/:id/restore", restoreTransaction); // PATCH  /api/transactions/:id/restore

export default router;