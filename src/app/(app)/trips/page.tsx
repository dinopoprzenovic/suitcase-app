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
    <div className="space-y-6">
      <PageHeader
        title="My Trips"
        subtitle={`${trips.length} trips total`}
        action={
          <Link
            href="/plan"
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={16} />
            New Trip
          </Link>
        }
      />

      <div className="flex gap-2">
        {["all", "upcoming", "active", "completed", "draft"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {filtered.map((trip, i) => (
          <TripCard key={trip.id} trip={trip} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted">No trips found.</p>
        </div>
      )}
    </div>
  );
}
