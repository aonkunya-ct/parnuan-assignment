"use client";

import { useState } from "react";

interface TransactionFilterProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string) => void;
  totalCount: number;
}

export default function TransactionFilter({
  onSearch,
  onFilterType,
  totalCount,
}: TransactionFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilter = (type: string) => {
    setActiveFilter(type);
    onFilterType(type);
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "income", label: "Income" },
    { key: "expense", label: "Expense" },
  ];

  return (
    <div className="mb-6">
      <div className="hidden lg:flex lg:flex-row lg:gap-3 lg:mb-4">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilter(filter.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex lg:items-center lg:justify-between">
        <p className="text-sm text-gray-400">
          {totalCount} {totalCount === 1 ? "transaction" : "transactions"}
        </p>
        {(searchQuery || activeFilter !== "all") && (
          <button
            onClick={() => {
              handleSearch("");
              handleFilter("all");
            }}
            className="text-sm text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="lg:hidden">
        <div className="relative mb-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilter(filter.key)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </p>
          {(searchQuery || activeFilter !== "all") && (
            <button
              onClick={() => {
                handleSearch("");
                handleFilter("all");
              }}
              className="text-xs text-emerald-500 font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}