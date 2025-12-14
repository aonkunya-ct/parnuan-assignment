import { Summary } from "@/types/transaction";

interface SummaryCardProps {
  summary: Summary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-gray-400">💰</span>
            <p className="text-gray-500 text-sm font-medium">Total Balance</p>
          </div>
          <p className="text-3xl font-bold text-gray-800">฿{formatCurrency(summary.balance)}</p>
          <p className={`text-sm mt-1 ${summary.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
            {summary.balance >= 0 ? "↑" : "↓"} {summary.balance >= 0 ? "Positive" : "Negative"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-gray-400">📉</span>
            <p className="text-gray-500 text-sm font-medium">Total Expense</p>
          </div>
          <p className="text-3xl font-bold text-red-500">฿{formatCurrency(summary.totalExpense)}</p>
          <p className="text-sm text-gray-400 mt-1">This period</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-gray-400">📈</span>
            <p className="text-gray-500 text-sm font-medium">Total Income</p>
          </div>
          <p className="text-3xl font-bold text-green-500">฿{formatCurrency(summary.totalIncome)}</p>
          <p className="text-sm text-gray-400 mt-1">This period</p>
        </div>
      </div>

      <div className="lg:hidden bg-emerald-500 rounded-3xl p-6 mb-6 shadow-lg">
        <div className="text-center mb-6">
          <p className="text-emerald-100 text-sm font-medium mb-1">Total Balance</p>
          <p className="text-white text-4xl font-bold">฿{formatCurrency(summary.balance)}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex justify-around">
          <div className="text-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-red-500 text-lg">↓</span>
            </div>
            <p className="text-gray-400 text-xs">Expense</p>
            <p className="text-gray-800 font-bold">฿{formatCurrency(summary.totalExpense)}</p>
          </div>

          <div className="w-px bg-gray-200"></div>

          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-500 text-lg">↑</span>
            </div>
            <p className="text-gray-400 text-xs">Income</p>
            <p className="text-gray-800 font-bold">฿{formatCurrency(summary.totalIncome)}</p>
          </div>
        </div>
      </div>
    </>
  );
}