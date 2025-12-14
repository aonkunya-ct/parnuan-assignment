import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  { id: "1", type: "expense", amount: 45, description: "กาแฟเย็น Cafe Amazon", date: "2024-01-15T08:30:00Z" },
  { id: "2", type: "expense", amount: 350, description: "เติมน้ำมัน", date: "2024-01-15T12:00:00Z" },
  { id: "3", type: "income", amount: 25000, description: "เงินเดือน", date: "2024-01-01T00:00:00Z" },
  { id: "4", type: "expense", amount: 1500, description: "ค่าไฟฟ้า", date: "2024-01-10T00:00:00Z" },
  { id: "5", type: "expense", amount: 200, description: "Netflix", date: "2024-01-05T00:00:00Z" },
  { id: "6", type: "expense", amount: 1200, description: "เสื้อยืด Uniqlo", date: "2024-01-03T15:45:00Z" },
  { id: "7", type: "expense", amount: 80, description: "ข้าวมันไก่", date: "2024-01-14T12:30:00Z" },
  { id: "8", type: "income", amount: 500, description: "ขายของมือสอง", date: "2024-01-08T10:00:00Z" },
  { id: "9", type: "expense", amount: 890, description: "ยาแก้หวัด + หมอ", date: "2024-01-12T10:30:00Z" },
  { id: "10", type: "expense", amount: 65, description: "ส้มตำ + ไก่ย่าง", date: "2024-01-11T18:00:00Z" },
];