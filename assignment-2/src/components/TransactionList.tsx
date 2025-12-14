import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("กาแฟ") || desc.includes("cafe") || desc.includes("ข้าว") || desc.includes("ส้มตำ")) return "🍽️";
    if (desc.includes("น้ำมัน") || desc.includes("เติม")) return "⛽";
    if (desc.includes("ไฟฟ้า")) return "💡";
    if (desc.includes("netflix")) return "🎬";
    if (desc.includes("เสื้อ") || desc.includes("uniqlo")) return "👕";
    if (desc.includes("ยา") || desc.includes("หมอ")) return "💊";
    if (desc.includes("เงินเดือน")) return "💰";
    if (desc.includes("ขาย")) return "🛒";
    return "📝";
  };

  return (
    <div className="min-h-[400px]">
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-gray-500 font-medium">No transactions found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase w-[40%]">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase w-[20%]">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase w-[20%]">Type</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase w-[20%]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-xl">{getIcon(transaction.description)}</span>
                        </div>
                        <span className="font-medium text-gray-800">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">{formatDate(transaction.date)}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span className="mr-1">{transaction.type === "income" ? "↑" : "↓"}</span>
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-4 text-right font-bold ${
                        transaction.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}฿{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{getIcon(transaction.description)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <p
                  className={`font-bold text-lg ${
                    transaction.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}฿{formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}