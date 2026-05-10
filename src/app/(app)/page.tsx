"use client";

import { trips, notifications, mockUser, gifts } from "@/lib/data";
import { TripCard } from "@/components/trip-card";
import { StatCard } from "@/components/stat-card";
import { NotificationPanel } from "@/components/notification-panel";
import { PageHeader } from "@/components/page-header";
import {
  MapPin,
  Wallet,
  TrendingUp,
  Plane,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const upcomingTrips = trips.filter((t) => t.status === "upcoming");
  const activeTrips = trips.filter((t) => t.status === "active");
  const totalSpent = trips.reduce((s, t) => s + t.budget.spent, 0);
  const totalBudget = trips.reduce((s, t) => s + t.budget.total, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <PageHeader
          title={`Welcome back, ${mockUser.name.split(" ")[0]}`}
          subtitle="Here's what's happening with your travels."
        />
        <div className="flex items-center gap-3 pt-1">
          <NotificationPanel notifications={notifications} />
          <Link
            href="/plan"
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={16} />
            Plan a Trip
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total Trips"
          value={String(trips.length)}
          change="+2 this year"
          icon={<Plane size={18} />}
        />
        <StatCard
          label="Countries Visited"
          value="4"
          change="+1 this month"
          icon={<MapPin size={18} />}
        />
        <StatCard
          label="Total Spent"
          value={`€${totalSpent.toLocaleString()}`}
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Avg. Savings"
          value="18%"
          change="vs. booking separately"
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* Active trip banner */}
      {activeTrips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium tracking-wider text-accent uppercase">
                Active Trip
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                {activeTrips[0].title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {activeTrips[0].destination}, {activeTrips[0].country} &middot;{" "}
                Day 2 of {activeTrips[0].itinerary.length}
              </p>
            </div>
            <Link
              href={`/trip/${activeTrips[0].id}`}
              className="flex items-center gap-2 rounded-lg border border-accent/30 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              View Itinerary
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Upcoming trips */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Trips</h2>
          <Link
            href="/trips"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {upcomingTrips.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>

      {/* Recent gifts */}
      {gifts.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Gifts</h2>
            <Link
              href="/gifts"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {gifts.slice(0, 3).map((gift) => (
              <div
                key={gift.id}
                className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-accent uppercase">
                      {gift.occasion}
                    </p>
                    <h3 className="mt-1 font-semibold">{gift.tripTitle}</h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {gift.destination}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      gift.status === "activated"
                        ? "bg-success/10 text-success"
                        : gift.status === "delivered"
                          ? "bg-accent/10 text-accent"
                          : "bg-foreground/5 text-muted"
                    }`}
                  >
                    {gift.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-sm text-muted">
                    From <span className="text-foreground">{gift.from}</span> to{" "}
                    <span className="text-foreground">{gift.to}</span>
                  </p>
                  <p className="font-semibold">
                    €{gift.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
