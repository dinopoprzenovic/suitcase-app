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
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/trips"
            className="rounded-lg border border-border p-1.5 transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft size={14} />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{trip.title}</h1>
            <p className="text-xs text-muted">
              {trip.destination}, {trip.country}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="rounded-lg border border-border p-1.5 transition-colors hover:bg-foreground/5">
            <Heart size={14} />
          </button>
          <button className="rounded-lg border border-border p-1.5 transition-colors hover:bg-foreground/5">
            <Share2 size={14} />
          </button>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex flex-wrap items-center gap-1.5">
        {trip.isGroup && (
          <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            <Users size={10} />
            Group
          </span>
        )}
        {trip.isGift && (
          <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            <Gift size={10} />
            Gift
          </span>
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
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
      </div>

      {/* Trip image banner */}
      <div className="relative h-40 overflow-hidden rounded-lg">
        <img
          src={trip.image}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 text-white">
          <div className="flex items-center gap-1 text-xs">
            <Calendar size={12} />
            {new Date(trip.dates.start).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}{" "}
            &ndash;{" "}
            {new Date(trip.dates.end).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MapPin size={12} />
            {trip.destination}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Users size={12} />
            {trip.travelers}
          </div>
        </div>
      </div>

      {/* Budget ring card */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="mb-3 text-xs font-medium text-muted">Budget Overview</h3>
        <BudgetRing
          spent={trip.budget.spent}
          total={trip.budget.total}
          currency={trip.budget.currency}
        />

        {/* Category breakdown */}
        <div className="mt-4 space-y-1.5 border-t border-border pt-3">
          <h4 className="text-[10px] font-medium tracking-wider text-muted uppercase">
            By Category
          </h4>
          {Object.entries(categorySpend)
            .sort(([, a], [, b]) => b - a)
            .map(([type, amount]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${categoryColors[type] || "bg-muted"}`}
                />
                <span className="flex-1 text-xs capitalize">{type}</span>
                <span className="text-xs font-medium">
                  €{amount.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Trip actions */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs transition-colors hover:bg-foreground/5">
          <RefreshCw size={12} className="text-muted" />
          Re-route
        </button>
        <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs transition-colors hover:bg-foreground/5">
          <Shield size={12} className="text-muted" />
          Insurance
        </button>
        <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs transition-colors hover:bg-foreground/5">
          <AlertTriangle size={12} className="text-muted" />
          Report issue
        </button>
      </div>

      {/* Itinerary days */}
      <div className="space-y-3">
        {trip.itinerary.map((day, di) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: di * 0.05 }}
          >
            <div className="mb-2 flex items-baseline gap-2">
              <h3 className="text-sm font-semibold">Day {day.day}</h3>
              <span className="text-xs text-muted">{day.date}</span>
            </div>
            <div className="rounded-lg border border-border bg-card">
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

      {/* Assurance */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-accent" />
          <h3 className="text-xs font-medium">Suitcase Assurance</h3>
        </div>
        <p className="mt-1.5 text-[11px] text-muted">
          This trip includes free cancellation on 3 of 5 bookings and
          penalty-free changes up to 48h before departure.
        </p>
        <button className="mt-2 text-[11px] font-medium text-accent">
          View coverage details
        </button>
      </div>
    </div>
  );
}
