"use client";

import { useState } from "react";
import festivals from "@/data/festivals.json";

import Link from "next/link";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarPage() {
  const [monthFilter, setMonthFilter] = useState<number | null>(null);

  const sorted = [...festivals].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const filtered =
    monthFilter === null
      ? sorted
      : sorted.filter((f) => new Date(f.date).getMonth() === monthFilter);

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
        Festival Calendar 2026
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">
        All major Hindu festivals for the year, in one place.
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        <button
          onClick={() => setMonthFilter(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            monthFilter === null
              ? "bg-orange-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          All
        </button>
        {MONTHS.map((month, i) => (
          <button
            key={month}
            onClick={() => setMonthFilter(i)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              monthFilter === i
                ? "bg-orange-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {filtered.length === 0 && (
          <p className="text-zinc-500">No festivals found for this month.</p>
        )}
        {filtered.map((festival) => (
          <div
            key={festival.id}
            className="border border-black/8 dark:border-white/[.145] rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/${festival.id}`}
                  className="font-medium text-black dark:text-zinc-50 hover:text-orange-600"
                >
                  {festival.name}
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {festival.shortDescription}
                </p>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap ml-4">
                {new Date(festival.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
