"use client";

import { trips } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { BudgetRing } from "@/components/budget-ring";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  UtensilsCrossed,
  Ticket,
  Car,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  flight: <Plane size={14} />,
  hotel: <Hotel size={14} />,
  dining: <UtensilsCrossed size={14} />,
  activity: <Ticket size={14} />,
  mobility: <Car size={14} />,
};

const typeColors: Record<string, string> = {
  flight: "bg-blue-500",
  hotel: "bg-purple-500",
  dining: "bg-amber-500",
  activity: "bg-emerald-500",
  mobility: "bg-cyan-500",
};

export default function BudgetPage() {
  const totalBudget = trips.reduce((s, t) => s + t.budget.total, 0);
  const totalSpent = trips.reduce((s, t) => s + t.budget.spent, 0);

  const allItems = trips.flatMap((t) =>
    t.itinerary.flatMap((d) =>
      d.items.map((item) => ({ ...item, tripTitle: t.title }))
    )
  );

  const byCategory = allItems.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + item.cost;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedCategories = Object.entries(byCategory).sort(
    ([, a], [, b]) => b - a
  );

  const recentTransactions = allItems
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget Tracker"
        subtitle="Track spending across all your trips in one place."
      />

      {/* Overview cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-medium tracking-wider text-muted uppercase">
            Total Budget
          </p>
          <p className="mt-2 text-2xl font-semibold">
            €{totalBudget.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">
            Across {trips.length} trips
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-medium tracking-wider text-muted uppercase">
            Total Spent
          </p>
          <p className="mt-2 text-2xl font-semibold">
            €{totalSpent.toLocaleString()}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-success">
            <ArrowDownRight size={12} />
            18% below separate booking
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-medium tracking-wider text-muted uppercase">
            Remaining
          </p>
          <p className="mt-2 text-2xl font-semibold">
            €{(totalBudget - totalSpent).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">
            {Math.round((totalSpent / totalBudget) * 100)}% utilized
          </p>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-xs font-medium tracking-wider text-accent uppercase">
            Savings
          </p>
          <p className="mt-2 text-2xl font-semibold text-accent">
            €{Math.round(totalSpent * 0.18).toLocaleString()}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs text-accent">
            <TrendingDown size={12} />
            vs. booking separately
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {/* Category breakdown */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-5 text-sm font-medium text-muted">
              Spending by Category
            </h3>
            <div className="space-y-4">
              {sortedCategories.map(([type, amount], i) => {
                const pct = Math.round((amount / totalSpent) * 100);
                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-white ${typeColors[type]}`}
                        >
                          {typeIcons[type]}
                        </div>
                        <span className="text-sm font-medium capitalize">
                          {type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted">{pct}%</span>
                        <span className="text-sm font-semibold">
                          €{amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`h-full rounded-full ${typeColors[type]}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Per-trip breakdown */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-medium text-muted">
              Spending by Trip
            </h3>
            <div className="space-y-3">
              {trips.map((trip) => {
                const pct = Math.round(
                  (trip.budget.spent / trip.budget.total) * 100
                );
                return (
                  <div
                    key={trip.id}
                    className="flex items-center gap-4 rounded-lg border border-border p-4"
                  >
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="h-12 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{trip.title}</p>
                        <p className="text-sm font-semibold">
                          €{trip.budget.spent.toLocaleString()} / €
                          {trip.budget.total.toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/5">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-muted">
                Overall Budget
              </h3>
              <BudgetRing
                spent={totalSpent}
                total={totalBudget}
                currency="EUR"
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-medium text-muted">
                Top Expenses
              </h3>
              <div className="space-y-2">
                {recentTransactions.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded text-white ${typeColors[item.type]}`}
                      >
                        {typeIcons[item.type]}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{item.title}</p>
                        <p className="text-[11px] text-muted">
                          {item.tripTitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold">
                      €{item.cost.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
