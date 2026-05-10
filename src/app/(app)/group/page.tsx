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
    <div className="space-y-3">
      <PageHeader
        title="Group Travel"
        subtitle="Shared itineraries, split costs, registries."
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover">
            <Plus size={14} />
            Create
          </button>
        }
      />

      {/* Group trip hero */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-card">
        <div className="relative h-32">
          <img
            src={trip.image}
            alt={trip.destination}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center gap-1.5">
              <Heart size={12} className="text-accent" />
              <span className="text-[10px] font-medium tracking-wider uppercase">
                Honeymoon Registry
              </span>
            </div>
            <h2 className="mt-0.5 text-sm font-semibold">{groupTrip.name}</h2>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <MapPin size={10} />
                {trip.destination}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={10} />
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
          <button className="absolute right-3 top-3 rounded-lg bg-white/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/30">
            <Share2 size={14} className="text-white" />
          </button>
        </div>

        <div className="p-3">
          {/* Progress */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-semibold">
                €{groupTrip.totalContributed.toLocaleString()}
              </span>
              <span className="text-xs text-muted">
                {" "}/ €{groupTrip.totalGoal.toLocaleString()}
              </span>
            </div>
            <span className="text-xs font-medium text-accent">{progress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
      </div>

      {/* Members — horizontal scroll row */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="mb-2 text-xs font-medium text-muted">
          Members ({groupTrip.members.length})
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {groupTrip.members.map((member) => (
            <div
              key={member.id}
              className="flex shrink-0 flex-col items-center gap-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs font-semibold">
                {member.avatar}
              </div>
              <div className="flex items-center gap-0.5">
                <p className="text-[11px] font-medium truncate max-w-[60px]">{member.name.split(" ")[0]}</p>
                {member.role === "organizer" && (
                  <Crown size={10} className="text-accent" />
                )}
              </div>
              <p className="text-[10px] text-muted">
                €{member.contributed.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium transition-colors hover:bg-foreground/5">
          <Plus size={12} />
          Invite Member
        </button>
      </div>

      {/* Trip Registry */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Trip Registry</h3>
        <div className="space-y-2">
          {groupTrip.registry.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-lg border bg-card p-3 transition-shadow hover:shadow-sm ${
                item.funded ? "border-success/20" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-accent">
                      Day {item.day}
                    </span>
                    <span className="text-[10px] text-muted truncate">
                      {item.location}
                    </span>
                  </div>
                  <h4 className="mt-0.5 text-sm font-semibold">{item.description}</h4>
                  <span className="mt-0.5 inline-block rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-muted">
                    {item.category}
                  </span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-sm font-semibold">
                    €{item.cost.toLocaleString()}
                  </p>
                  {item.funded ? (
                    <span className="flex items-center gap-1 text-[10px] text-success">
                      <Check size={10} />
                      Funded
                    </span>
                  ) : (
                    <button className="mt-1 flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1 text-[10px] font-medium text-white transition-colors hover:bg-accent-hover">
                      <Gift size={10} />
                      Fund
                    </button>
                  )}
                </div>
              </div>
              {item.purchaser && (
                <div className="mt-2 border-t border-border pt-2">
                  <p className="text-xs text-muted">
                    Funded by{" "}
                    <span className="font-medium text-foreground">
                      {item.purchaser}
                    </span>
                  </p>
                  {item.message && (
                    <p className="mt-0.5 text-[11px] italic text-muted">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth loop stats */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-accent" />
          <h3 className="text-xs font-medium">Growth Loop</h3>
        </div>
        <p className="mt-1.5 text-[11px] text-muted">
          This group trip generated{" "}
          <span className="font-semibold text-foreground">
            {groupTrip.members.length - 1} new users
          </span>{" "}
          from a single booking.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-card p-2 text-center">
            <p className="text-sm font-semibold">{groupTrip.members.length}</p>
            <p className="text-[10px] text-muted">Users</p>
          </div>
          <div className="rounded-lg bg-card p-2 text-center">
            <p className="text-sm font-semibold">€0</p>
            <p className="text-[10px] text-muted">CAC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
