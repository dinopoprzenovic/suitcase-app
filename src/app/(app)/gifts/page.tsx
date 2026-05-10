"use client";

import { gifts } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { motion } from "framer-motion";
import {
  Gift,
  Heart,
  ArrowRight,
  Plus,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  Package,
} from "lucide-react";
import { useState } from "react";

const statusConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  purchased: {
    icon: <Package size={12} />,
    color: "text-muted",
    bg: "bg-foreground/5",
  },
  delivered: {
    icon: <Send size={12} />,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  activated: {
    icon: <CheckCircle2 size={12} />,
    color: "text-success",
    bg: "bg-success/10",
  },
  redeemed: {
    icon: <CheckCircle2 size={12} />,
    color: "text-success",
    bg: "bg-success/10",
  },
};

export default function GiftsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-3">
      <PageHeader
        title="Travel Gifts"
        subtitle="Send a trip to someone special."
        action={
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={14} />
            Send
          </button>
        }
      />

      {/* Gift creation form */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden rounded-lg border border-accent/20 bg-gradient-to-b from-accent/5 to-transparent p-3"
        >
          <div className="flex items-center gap-2 text-accent">
            <Heart size={14} />
            <h3 className="text-sm font-semibold">Create a Trip Gift</h3>
          </div>
          <p className="mt-1.5 text-xs text-muted">
            Choose a destination, set a budget, add a personal message.
          </p>

          <div className="mt-3 space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted">
                Recipient name
              </label>
              <input
                type="text"
                placeholder="Who's the lucky one?"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted">
                Occasion
              </label>
              <select className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent">
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Wedding</option>
                <option>Christmas</option>
                <option>Just because</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted">
                Budget
              </label>
              <input
                type="number"
                placeholder="€1,000"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted">
                Personal message
              </label>
              <textarea
                rows={2}
                placeholder="Write something from the heart..."
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover">
              <Gift size={12} />
              Continue
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-foreground/5"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* How it works — 2x2 grid */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="text-xs font-medium text-muted">How Gift Trips Work</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            {
              step: "01",
              title: "You buy",
              desc: "Choose a destination and budget.",
            },
            {
              step: "02",
              title: "We hold",
              desc: "Funds held securely until activation.",
            },
            {
              step: "03",
              title: "They activate",
              desc: "Recipient gets account & customizes.",
            },
            {
              step: "04",
              title: "They travel",
              desc: "Full coordination — flights, hotels, more.",
            },
          ].map((s) => (
            <div key={s.step}>
              <span className="text-[10px] font-medium text-accent">{s.step}</span>
              <h4 className="mt-0.5 text-sm font-semibold">{s.title}</h4>
              <p className="mt-0.5 text-[11px] text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gift list */}
      <div>
        <h2 className="mb-3 text-sm font-semibold">Your Gifts</h2>
        <div className="space-y-2">
          {gifts.map((gift, i) => {
            const config = statusConfig[gift.status];
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={gift.image}
                    alt={gift.destination}
                    className="h-16 w-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">{gift.tripTitle}</h3>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${config.bg} ${config.color}`}
                      >
                        {config.icon}
                        {gift.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted">{gift.destination}</p>
                    <p className="mt-1 text-[11px] italic text-muted truncate">
                      &ldquo;{gift.message}&rdquo;
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <p className="text-xs text-muted">
                        {gift.occasion} &middot; {gift.from} &rarr; {gift.to}
                      </p>
                      <p className="text-sm font-semibold">
                        €{gift.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Float info */}
      <div className="rounded-lg border border-border bg-foreground/[0.02] p-3">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-accent" />
          <h3 className="text-xs font-medium">Float Revenue</h3>
        </div>
        <p className="mt-1.5 text-[11px] text-muted">
          Between purchase and activation, Suitcase holds the funds and earns
          the spread. Average float window: 45 days.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] text-muted">Active float</p>
            <p className="mt-0.5 text-sm font-semibold">€3,200</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] text-muted">Avg. window</p>
            <p className="mt-0.5 text-sm font-semibold">45 days</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] text-muted">Earned</p>
            <p className="mt-0.5 text-sm font-semibold text-accent">€48</p>
          </div>
        </div>
      </div>
    </div>
  );
}
