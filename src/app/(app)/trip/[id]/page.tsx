"use client";

import { use } from "react";
import { trips } from "@/lib/data";
import { ItineraryItem } from "@/components/itinerary-item";
import { BudgetRing } from "@/components/budget-ring";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Heart,
  Users,
  Gift,
  Calendar,
  MapPin,
  Shield,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const trip = trips.find((t) => t.id === id) || trips[0];

  const categorySpend = trip.itinerary.reduce(
    (acc, day) => {
      day.items.forEach((item) => {
        acc[item.type] = (acc[item.type] || 0) + item.cost;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryColors: Record<string, string> = {
    flight: "bg-blue-500",
    hotel: "bg-purple-500",
    dining: "bg-amber-500",
    activity: "bg-emerald-500",
    mobility: "bg-cyan-500",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/trips"
            className="rounded-lg border border-border p-2 transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">{trip.title}</h1>
            <p className="mt-0.5 text-sm text-muted">
              {trip.destination}, {trip.country}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {trip.isGroup && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Users size={12} />
              Group Trip
            </span>
          )}
          {trip.isGift && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Gift size={12} />
              Gift
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              trip.status === "active"
                ? "bg-success/10 text-success"
                : trip.status === "upcoming"
                  ? "bg-accent/10 text-accent"
                  : trip.status === "completed"
                    ? "bg-foreground/5 text-muted"
                    : "bg-warning/10 text-warning"
            }`}
          >
            {trip.status}
          </span>
          <button className="rounded-lg border border-border p-2 transition-colors hover:bg-foreground/5">
            <Heart size={16} />
          </button>
          <button className="rounded-lg border border-border p-2 transition-colors hover:bg-foreground/5">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Trip image banner */}
      <div className="relative h-48 overflow-hidden rounded-xl">
        <img
          src={trip.image}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-5 flex items-center gap-4 text-white">
          <div className="flex items-center gap-1.5 text-sm">
            <Calendar size={14} />
            {new Date(trip.dates.start).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}{" "}
            &ndash;{" "}
            {new Date(trip.dates.end).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin size={14} />
            {trip.destination}
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Users size={14} />
            {trip.travelers} travelers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Itinerary */}
        <div className="space-y-6">
          {trip.itinerary.map((day, di) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: di * 0.05 }}
            >
              <div className="mb-3 flex items-baseline gap-3">
                <h3 className="font-semibold">Day {day.day}</h3>
                <span className="text-sm text-muted">{day.date}</span>
              </div>
              <div className="rounded-xl border border-border bg-card">
                {day.items.map((item, i) => (
                  <ItineraryItem
                    key={item.id}
                    item={item}
                    isLast={i === day.items.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-8 space-y-4">
            {/* Budget */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-muted">
                Budget Overview
              </h3>
              <BudgetRing
                spent={trip.budget.spent}
                total={trip.budget.total}
                currency={trip.budget.currency}
              />

              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <h4 className="text-xs font-medium tracking-wider text-muted uppercase">
                  By Category
                </h4>
                {Object.entries(categorySpend)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, amount]) => (
                    <div key={type} className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${categoryColors[type] || "bg-muted"}`}
                      />
                      <span className="flex-1 text-sm capitalize">{type}</span>
                      <span className="text-sm font-medium">
                        €{amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-medium text-muted">
                Trip Actions
              </h3>
              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-foreground/5">
                  <RefreshCw size={14} className="text-muted" />
                  Re-route a segment
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-foreground/5">
                  <Shield size={14} className="text-muted" />
                  Add travel insurance
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-foreground/5">
                  <AlertTriangle size={14} className="text-muted" />
                  Report an issue
                </button>
              </div>
            </div>

            {/* Assurance */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-accent" />
                <h3 className="text-sm font-medium">Suitcase Assurance</h3>
              </div>
              <p className="mt-2 text-xs text-muted">
                This trip includes free cancellation on 3 of 5 bookings and
                penalty-free changes up to 48h before departure.
              </p>
              <button className="mt-3 text-xs font-medium text-accent">
                View coverage details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
