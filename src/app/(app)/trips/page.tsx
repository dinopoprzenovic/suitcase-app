"use client";

import { trips } from "@/lib/data";
import { TripCard } from "@/components/trip-card";
import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TripsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? trips : trips.filter((t) => t.status === filter);

  return (
    <div className="space-y-3">
      <PageHeader
        title="My Trips"
        subtitle={`${trips.length} trips total`}
        action={
          <Link
            href="/plan"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={14} />
            New
          </Link>
        }
      />

      {/* Horizontally scrollable filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {["all", "upcoming", "active", "completed", "draft"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Single column trip list */}
      <div className="space-y-2">
        {filtered.map((trip, i) => (
          <TripCard key={trip.id} trip={trip} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-xs text-muted">No trips found.</p>
        </div>
      )}
    </div>
  );
}
