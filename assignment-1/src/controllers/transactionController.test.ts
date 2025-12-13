import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Transaction from "../models/Transaction";

// เพิ่ม timeout สำหรับ MongoDB Atlas
jest.setTimeout(30000);

const TEST_DB_URI = process.env.MONGODB_URI as string;

beforeAll(async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(TEST_DB_URI);
      console.log("✅ Test DB Connected");
    }
  } catch (error) {
    console.error("❌ Test DB Connection Error:", error);
    throw error;
  }
});

afterAll(async () => {
  await Transaction.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Transaction.deleteMany({});
});

describe("Transaction API", () => {
  // ===== CREATE =====
  describe("POST /api/transactions", () => {
    it("should create a new transaction", async () => {
      const res = await request(app)
        .post("/api/transactions")
        .send({
          type: "expense",
          amount: 45,
          description: "กาแฟ Cafe Amazon",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.type).toBe("expense");
      expect(res.body.data.amount).toBe(45);
    });

    it("should return validation error for invalid data", async () => {
      const res = await request(app)
        .post("/api/transactions")
        .send({
          type: "invalid",
          amount: -100,
          description: "",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Validation failed");
    });
  });

  // ===== READ ALL =====
  describe("GET /api/transactions", () => {
    it("should return all transactions", async () => {
      await Transaction.create([
        { type: "income", amount: 1000, description: "เงินเดือน" },
        { type: "expense", amount: 50, description: "กาแฟ" },
      ]);

      const res = await request(app).get("/api/transactions");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
    });

    it("should filter by type", async () => {
      await Transaction.create([
        { type: "income", amount: 1000, description: "เงินเดือน" },
        { type: "expense", amount: 50, description: "กาแฟ" },
      ]);

      const res = await request(app).get("/api/transactions?type=income");

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].type).toBe("income");
    });

    it("should paginate results", async () => {
      await Transaction.create([
        { type: "expense", amount: 10, description: "Item 1" },
        { type: "expense", amount: 20, description: "Item 2" },
        { type: "expense", amount: 30, description: "Item 3" },
      ]);

      const res = await request(app).get("/api/transactions?page=1&limit=2");

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.total).toBe(3);
      expect(res.body.totalPages).toBe(2);
    });
  });

  // ===== READ ONE =====
  describe("GET /api/transactions/:id", () => {
    it("should return a transaction by ID", async () => {
      const transaction = await Transaction.create({
        type: "expense",
        amount: 100,
        description: "Test",
      });

      const res = await request(app).get(`/api/transactions/${transaction._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.description).toBe("Test");
    });

    it("should return 404 for non-existent ID", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/transactions/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // ===== UPDATE =====
  describe("PUT /api/transactions/:id", () => {
    it("should update a transaction", async () => {
      const transaction = await Transaction.create({
        type: "expense",
        amount: 100,
        description: "Original",
      });

      const res = await request(app)
        .put(`/api/transactions/${transaction._id}`)
        .send({ description: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.description).toBe("Updated");
    });
  });

  // ===== DELETE (Soft Delete) =====
  describe("DELETE /api/transactions/:id", () => {
    it("should soft delete a transaction", async () => {
      const transaction = await Transaction.create({
        type: "expense",
        amount: 100,
        description: "To Delete",
      });

      const res = await request(app).delete(`/api/transactions/${transaction._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.deletedAt).not.toBeNull();

      // ตรวจสอบว่าไม่แสดงใน GET all
      const getRes = await request(app).get("/api/transactions");
      expect(getRes.body.count).toBe(0);
    });
  });

  // ===== RESTORE =====
  describe("PATCH /api/transactions/:id/restore", () => {
    it("should restore a deleted transaction", async () => {
      const transaction = await Transaction.create({
        type: "expense",
        amount: 100,
        description: "Deleted",
        deletedAt: new Date(),
      });

      const res = await request(app).patch(`/api/transactions/${transaction._id}/restore`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.deletedAt).toBeNull();
    });
  });
});