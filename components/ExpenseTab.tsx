"use client";

import type { ExpenseItem } from "@/types/trip";
import { useState } from "react";



type ExpenseTabProps = {
  newExpenseTitle: string;
  setNewExpenseTitle: (value: string) => void;
  newExpenseDate: string;
  setNewExpenseDate: (value: string) => void;
  newExpenseAmount: string;
  setNewExpenseAmount: (value: string) => void;
  newExpenseCurrency: string;
  setNewExpenseCurrency: (value: string) => void;
  newExpenseExchangeRate: string;
  setNewExpenseExchangeRate: (value: string) => void;
  newExpensePaidBy: string;
  setNewExpensePaidBy: (value: string) => void;
  newExpenseMemo: string;
  setNewExpenseMemo: (value: string) => void;

  editingExpenseId: number | null;
  addExpense: () => void;
  cancelEditExpense: () => void;

  totalExpense: number;
  eachFamilyShare: number;
  paidBySuhyun: number;
  paidByEunhee: number;
  settlementMessage: string;

  expenseSummaryByCategory: {
    category: string;
    total: number;
  }[];

  expenseList: ExpenseItem[];
  startEditExpense: (item: ExpenseItem) => void;
  deleteExpense: (id: number, title: string) => void;
  
  expenseCategories: string[];
  newExpenseCategory: string;
  setNewExpenseCategory: (value: string) => void;
};

const formatExpenseDate = (date?: string) => {
  if (!date) return "";

  const [_, month, day] = date.split("-");
  return `${Number(month)}/${Number(day)}`;
};




export default function ExpenseTab({
  newExpenseTitle,
  setNewExpenseTitle,
  newExpenseAmount,
  setNewExpenseAmount,
  newExpenseCurrency,
  setNewExpenseCurrency,
  newExpenseExchangeRate,
  setNewExpenseExchangeRate,
  newExpensePaidBy,
  setNewExpensePaidBy,
  newExpenseMemo,
  setNewExpenseMemo,
  editingExpenseId,
  addExpense,
  cancelEditExpense,
  totalExpense,
  eachFamilyShare,
  paidBySuhyun,
  paidByEunhee,
  settlementMessage,
  expenseSummaryByCategory,
  expenseList,
  startEditExpense,
  deleteExpense,
  expenseCategories,
  newExpenseCategory,
  setNewExpenseCategory,
  newExpenseDate,
  setNewExpenseDate,
}: ExpenseTabProps) {
  const [showCategorySummary, setShowCategorySummary] = useState(false);
  const [showExpenseSummary, setShowExpenseSummary] = useState(false);
  const [showFamilySummary, setShowFamilySummary] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const groupedExpenses = [...expenseList]
    .sort((a, b) => {
        const dateA = a.date ?? "";
        const dateB = b.date ?? "";

        return dateA.localeCompare(dateB);
    })
    .reduce<Record<string, typeof expenseList>>((groups, expense) => {
        const dateKey = expense.date ?? "날짜 없음";

        if (!groups[dateKey]) {
        groups[dateKey] = [];
        }

        groups[dateKey].push(expense);

        return groups;
    }, {});
  return (
    <div className="space-y-3">
        <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
            <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            className="flex w-full items-center justify-between text-left"
            >
            <span className="text-lg font-bold text-slate-900">비용 추가</span>
            <span className="text-sm font-bold text-blue-600">
                {showExpenseForm ? "닫기" : "보기"}
            </span>
            </button>

            {showExpenseForm && (
            <div className="mt-3">
                <input
                    type="date"
                    value={newExpenseDate}
                    onChange={(e) => setNewExpenseDate(e.target.value)}
                    className="mb-2 w-full rounded-lg border p-2"
                />

                <input
                value={newExpenseTitle}
                onChange={(e) => setNewExpenseTitle(e.target.value)}
                placeholder="비용 항목 예: 공항 픽업, 마사지"
                className="mb-2 w-full rounded-lg border p-2"
                />

                <select
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                className="mb-2 w-full rounded-lg border p-2"
                >
                {expenseCategories.map((category) => (
                    <option key={category}>{category}</option>
                ))}
                </select>

                <input
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                placeholder="금액 예: 120000"
                className="mb-2 w-full rounded-lg border p-2"
                />

                <div className="mb-2 grid grid-cols-2 gap-2">
                <select
                    value={newExpenseCurrency}
                    onChange={(e) => {
                    setNewExpenseCurrency(e.target.value);
                    if (e.target.value === "KRW") {
                        setNewExpenseExchangeRate("1");
                    }
                    }}
                    className="rounded-lg border p-2"
                >
                    <option value="KRW">원 KRW</option>
                    <option value="THB">태국 바트 THB</option>
                    <option value="SGD">싱가폴 달러 SGD</option>
                </select>

                <input
                    value={newExpenseExchangeRate}
                    onChange={(e) => setNewExpenseExchangeRate(e.target.value)}
                    placeholder="환율 예: 38"
                    className="rounded-lg border p-2"
                />
                </div>

                <select
                value={newExpensePaidBy}
                onChange={(e) => setNewExpensePaidBy(e.target.value)}
                className="mb-2 w-full rounded-lg border p-2"
                >
                <option>수현이네</option>
                <option>은희네</option>
                </select>

                <textarea
                value={newExpenseMemo}
                onChange={(e) => setNewExpenseMemo(e.target.value)}
                placeholder="메모"
                className="mb-3 w-full rounded-lg border p-2"
                />

                <div className="flex gap-2">
                <button
                    onClick={() => {
                        addExpense();
                        setShowExpenseForm(false);
                    }}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                    {editingExpenseId !== null ? "비용 수정 완료" : "비용 저장"}
                </button>

                {editingExpenseId !== null && (
                    <button
                    onClick={cancelEditExpense}
                    className="rounded-lg bg-gray-400 px-4 py-2 text-white"
                    >
                    취소
                    </button>
                )}
                </div>
            </div>
            )}
        </div>

      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <button
            onClick={() => setShowExpenseSummary(!showExpenseSummary)}
            className="flex w-full items-center justify-between text-left"
        >
            <span className="text-lg font-bold text-slate-900">
            공동 경비 요약
            </span>

            <span className="text-sm font-bold text-blue-600">
            {showExpenseSummary ? "닫기" : "보기"}
            </span>
        </button>

        {showExpenseSummary && (
            <>
            <p className="mt-3 font-medium text-slate-800">
                총 공동비용: {totalExpense.toLocaleString()}원
            </p>

            <p className="font-medium text-slate-800">
                가족별 부담액: {eachFamilyShare.toLocaleString()}원
            </p>

            <p className="text-sm font-medium text-slate-600">
                현재는 두 가족 1/2 정산 기준
            </p>

            <div className="mt-3 rounded-lg bg-green-50 p-3 font-medium text-green-700">
                {settlementMessage}
            </div>
            </>
        )}
        </div>
      
      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <button
            onClick={() => setShowCategorySummary(!showCategorySummary)}
            className="flex w-full items-center justify-between text-left"
        >
            <span className="text-lg font-bold text-slate-900">
            카테고리별 비용
            </span>
            <span className="text-sm font-bold text-blue-600">
            {showCategorySummary ? "닫기" : "보기"}
            </span>
        </button>

        {showCategorySummary && (
            <div className="mt-3 grid grid-cols-2 gap-2">
            {expenseSummaryByCategory.map((item) => (
                <div key={item.category} className="rounded-lg bg-slate-100 p-3">
                <p className="text-sm font-bold text-slate-700">
                    {item.category}
                </p>
                <p className="mt-1 font-bold text-slate-900">
                    {Math.round(item.total).toLocaleString()}원
                </p>
                </div>
            ))}
            </div>
        )}
        </div>

      <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-md">
        <button
            onClick={() => setShowFamilySummary(!showFamilySummary)}
            className="flex w-full items-center justify-between text-left"
        >
            <span className="text-lg font-bold text-slate-900">
            가족별 결제 금액
            </span>

            <span className="text-sm font-bold text-blue-600">
            {showFamilySummary ? "닫기" : "보기"}
            </span>
        </button>

        {showFamilySummary && (
            <div className="mt-3">
            <p className="font-medium text-slate-800">
                수현이네 결제: {paidBySuhyun.toLocaleString()}원
            </p>

            <p className="mt-2 font-medium text-slate-800">
                은희네 결제: {paidByEunhee.toLocaleString()}원
            </p>
            </div>
        )}
        </div>

      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <div key={date} className="space-y-2">
            <div className="rounded-lg bg-slate-100 px-3 py-2 text-xl font-black text-slate-800">
            📅 {date === "날짜 없음" ? "날짜 없음" : formatExpenseDate(date)}
            </div>

            {expenses.map((item) => (
            <div
                key={item.id}
                className="rounded-xl border border-slate-300 bg-white p-4 shadow-md"
            >
                <p className="text-xs font-medium text-slate-500">
                {item.date ? formatExpenseDate(item.date) : ""}
                </p>

                <div className="mb-1 text-sm font-medium text-green-600">
                {item.category ?? "기타"} · 비용
                </div>

                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>

                <p className="mt-1 font-medium text-slate-800">
                {Math.round(item.amount).toLocaleString()}원
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    원화 {Math.round(item.amount).toLocaleString()}원
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    입력 {item.originalAmount?.toLocaleString()} {item.currency}
                </span>

                {item.currency !== "KRW" && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    환율 {item.exchangeRate}원
                    </span>
                )}

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                    결제 {item.paidBy}
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                    정산 {item.split}
                </span>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-600">{item.memo}</p>

                <div className="mt-3 flex gap-2">
                <button
                    onClick={() => {
                    setShowExpenseForm(true);
                    startEditExpense(item);
                    }}
                    className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white"
                >
                    수정
                </button>

                <button
                    onClick={() => deleteExpense(item.id, item.title)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                >
                    삭제
                </button>
                </div>
            </div>
            ))}
        </div>
        ))}
    </div>
  );
}

