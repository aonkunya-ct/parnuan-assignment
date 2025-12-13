import { body, param } from "express-validator";

export const createTransactionValidator = [
  body("type")
    .notEmpty().withMessage("Type is required")
    .isIn(["income", "expense"]).withMessage("Type must be 'income' or 'expense'"),
  
  body("amount")
    .notEmpty().withMessage("Amount is required")
    .isNumeric().withMessage("Amount must be a number")
    .custom((value) => value > 0).withMessage("Amount must be positive"),
  
  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string")
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage("Description must be 1-200 characters"),
  
  body("date")
    .optional()
    .isISO8601().withMessage("Date must be a valid ISO 8601 date"),
];

export const updateTransactionValidator = [
  param("id")
    .isMongoId().withMessage("Invalid transaction ID"),
  
  body("type")
    .optional()
    .isIn(["income", "expense"]).withMessage("Type must be 'income' or 'expense'"),
  
  body("amount")
    .optional()
    .isNumeric().withMessage("Amount must be a number")
    .custom((value) => value > 0).withMessage("Amount must be positive"),
  
  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage("Description must be 1-200 characters"),
  
  body("date")
    .optional()
    .isISO8601().withMessage("Date must be a valid ISO 8601 date"),
];

export const idParamValidator = [
  param("id")
    .isMongoId().withMessage("Invalid transaction ID"),
];