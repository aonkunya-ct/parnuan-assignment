import { transactions } from "@/data/transactions";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return <Dashboard transactions={transactions} />;
}