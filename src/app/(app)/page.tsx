"use client";

import { trips, notifications, mockUser, gifts } from "@/lib/data";
import { TripCard } from "@/components/trip-card";
import { StatCard } from "@/components/stat-card";
import { NotificationPanel } from "@/components/notification-panel";
import {
  MapPin,
  Wallet,
  TrendingUp,
  Plane,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const upcomingTrips = trips.filter((t) => t.status === "upcoming");
  const activeTrips = trips.filter((t) => t.status === "active");
  const totalSpent = trips.reduce((s, t) => s + t.budget.spent, 0);

  return (
    <div className="space-y-3">
      {/* Greeting + notification bell */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-[#0A0A0A]">
            Hi, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-[11px] text-[#737373]">Here&apos;s your travel overview.</p>
        </div>
        <NotificationPanel notifications={notifications} />
      </div>

      {/* Stats 2x2 grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Total Trips"
          value={String(trips.length)}
          change="+2 this year"
          icon={<Plane size={16} />}
        />
        <StatCard
          label="Countries"
          value="4"
          change="+1 this month"
          icon={<MapPin size={16} />}
        />
        <StatCard
          label="Total Spent"
          value={`€${totalSpent.toLocaleString()}`}
          icon={<Wallet size={16} />}
        />
        <StatCard
          label="Avg. Savings"
          value="18%"
          change="vs. booking separately"
          icon={<TrendingUp size={16} />}
        />
      </div>

      {/* Active trip banner */}
      {activeTrips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-lg border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent p-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wider text-accent uppercase">
                Active Trip
              </p>
              <h3 className="mt-0.5 text-sm font-semibold">
                {activeTrips[0].title}
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                {activeTrips[0].destination}, {activeTrips[0].country} &middot;{" "}
                Day 2 of {activeTrips[0].itinerary.length}
              </p>
            </div>
            <Link
              href={`/trip/${activeTrips[0].id}`}
              className="flex items-center gap-1 rounded-lg border border-accent/30 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
            >
              View
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Upcoming trips */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Upcoming Trips</h2>
          <Link
            href="/trips"
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {upcomingTrips.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>

      {/* Recent gifts */}
      {gifts.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent Gifts</h2>
            <Link
              href="/gifts"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {gifts.slice(0, 3).map((gift) => (
              <div
                key={gift.id}
                className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium tracking-wider text-accent uppercase">
                      {gift.occasion}
                    </p>
                    <h3 className="mt-0.5 text-sm font-semibold truncate">{gift.tripTitle}</h3>
                    <p className="text-xs text-muted">{gift.destination}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ml-2 ${
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
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <p className="text-xs text-muted">
                    {gift.from} &rarr; {gift.to}
                  </p>
                  <p className="text-sm font-semibold">
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
