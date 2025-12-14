"use client";

import { useState, useMemo } from "react";
import { Transaction, Summary } from "@/types/transaction";
import SummaryCard from "./SummaryCard";
import TransactionList from "./TransactionList";
import TransactionFilter from "./TransactionFilter";

interface DashboardProps {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesType =
        filterType === "all" || transaction.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [sortedTransactions, searchQuery, filterType]);

  const summary: Summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        acc.balance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );
  }, [transactions]);

  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-100 lg:bg-gradient-to-br lg:from-gray-50 lg:to-gray-100">
      <div className="max-w-md lg:max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-gray-400 text-sm">Welcome Back</p>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Hello Parnuan</h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="hidden lg:block text-gray-500 text-sm">📅 {today}</p>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parnuan"
              alt="Avatar"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 ring-2 ring-white shadow-sm"
            />
          </div>
        </div>

        <SummaryCard summary={summary} />

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 lg:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Transactions</h2>
            </div>

            <TransactionFilter
              onSearch={setSearchQuery}
              onFilterType={setFilterType}
              totalCount={filteredTransactions.length}
            />

            <TransactionList transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </main>
  );
}