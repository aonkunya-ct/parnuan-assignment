import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  restoreTransaction,
} from "../controllers/transactionController";
import {
  createTransactionValidator,
  updateTransactionValidator,
  idParamValidator,
} from "../validators/transactionValidator";
import { handleValidationErrors } from "../middlewares/errorHandler";

const router = Router();

router.post(
  "/",
  createTransactionValidator,
  handleValidationErrors,
  createTransaction
);

router.get("/", getAllTransactions);

router.get(
  "/:id",
  idParamValidator,
  handleValidationErrors,
  getTransactionById
);

router.put(
  "/:id",
  updateTransactionValidator,
  handleValidationErrors,
  updateTransaction
);

router.delete(
  "/:id",
  idParamValidator,
  handleValidationErrors,
  deleteTransaction
);

router.patch(
  "/:id/restore",
  idParamValidator,
  handleValidationErrors,
  restoreTransaction
);

export default router;