"use client";

import { groupTrip, trips } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Check,
  Gift,
  MapPin,
  Calendar,
  Share2,
  Plus,
  Crown,
} from "lucide-react";

export default function GroupPage() {
  const trip = trips.find((t) => t.id === groupTrip.tripId) || trips[0];
  const progress = Math.round(
    (groupTrip.totalContributed / groupTrip.totalGoal) * 100
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Group Travel"
        subtitle="Shared itineraries, split costs, wedding registries — one trip, N new users."
        action={
          <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} />
            Create Group Trip
          </button>
        }
      />

      {/* Group trip hero */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative h-40">
          <img
            src={trip.image}
            alt={trip.destination}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 text-white">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-accent" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Honeymoon Registry
              </span>
            </div>
            <h2 className="mt-1 text-xl font-semibold">{groupTrip.name}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {trip.destination}, {trip.country}
              </span>
              <span className="flex items-center gap-1">
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
              </span>
            </div>
          </div>
          <button className="absolute right-4 top-4 rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30">
            <Share2 size={16} className="text-white" />
          </button>
        </div>

        <div className="p-5">
          {/* Progress */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-semibold">
                €{groupTrip.totalContributed.toLocaleString()}
              </span>
              <span className="text-sm text-muted">
                {" "}
                / €{groupTrip.totalGoal.toLocaleString()}
              </span>
            </div>
            <span className="text-sm font-medium text-accent">{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Registry */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Trip Registry</h3>
          <div className="space-y-3">
            {groupTrip.registry.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm ${
                  item.funded ? "border-success/20" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-accent">
                        Day {item.day}
                      </span>
                      <span className="text-xs text-muted">
                        {item.location}
                      </span>
                    </div>
                    <h4 className="mt-1 font-semibold">{item.description}</h4>
                    <span className="mt-1 inline-block rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-muted">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      €{item.cost.toLocaleString()}
                    </p>
                    {item.funded ? (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <Check size={12} />
                        Funded
                      </span>
                    ) : (
                      <button className="mt-1 flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover">
                        <Gift size={12} />
                        Fund this
                      </button>
                    )}
                  </div>
                </div>
                {item.purchaser && (
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-sm text-muted">
                      Funded by{" "}
                      <span className="font-medium text-foreground">
                        {item.purchaser}
                      </span>
                    </p>
                    {item.message && (
                      <p className="mt-1 text-sm italic text-muted">
                        &ldquo;{item.message}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Members sidebar */}
        <div className="space-y-4">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-medium text-muted">
                Members ({groupTrip.members.length})
              </h3>
              <div className="space-y-3">
                {groupTrip.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-xs font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium">{member.name}</p>
                        {member.role === "organizer" && (
                          <Crown size={12} className="text-accent" />
                        )}
                      </div>
                      <p className="text-xs text-muted">
                        €{member.contributed.toLocaleString()} contributed
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5">
                <Plus size={14} />
                Invite Member
              </button>
            </div>

            {/* Viral stats */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <h3 className="text-sm font-medium">Growth Loop</h3>
              </div>
              <p className="mt-2 text-xs text-muted">
                This group trip has generated{" "}
                <span className="font-semibold text-foreground">
                  {groupTrip.members.length - 1} new users
                </span>{" "}
                from a single booking. Each contributor becomes a Suitcase user
                automatically.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-card p-2.5 text-center">
                  <p className="text-lg font-semibold">{groupTrip.members.length}</p>
                  <p className="text-xs text-muted">Users</p>
                </div>
                <div className="rounded-lg bg-card p-2.5 text-center">
                  <p className="text-lg font-semibold">€0</p>
                  <p className="text-xs text-muted">CAC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
