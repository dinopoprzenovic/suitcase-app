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
    icon: <Package size={14} />,
    color: "text-muted",
    bg: "bg-foreground/5",
  },
  delivered: {
    icon: <Send size={14} />,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  activated: {
    icon: <CheckCircle2 size={14} />,
    color: "text-success",
    bg: "bg-success/10",
  },
  redeemed: {
    icon: <CheckCircle2 size={14} />,
    color: "text-success",
    bg: "bg-success/10",
  },
};

export default function GiftsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Travel Gifts"
        subtitle="Send a trip to someone special — every gift is two users and a float opportunity."
        action={
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={16} />
            Send a Gift
          </button>
        }
      />

      {/* Gift creation card */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent p-6"
        >
          <div className="flex items-center gap-2 text-accent">
            <Heart size={18} />
            <h3 className="font-semibold">Create a Trip Gift</h3>
          </div>
          <p className="mt-2 text-sm text-muted">
            Choose a destination, set a budget, add a personal message. The
            recipient gets a Suitcase account and can customize their trip within
            the budget you set.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Recipient name
              </label>
              <input
                type="text"
                placeholder="Who's the lucky one?"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Occasion
              </label>
              <select className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent">
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Wedding</option>
                <option>Christmas</option>
                <option>Just because</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Budget
              </label>
              <input
                type="number"
                placeholder="€1,000"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Personal message
            </label>
            <textarea
              rows={2}
              placeholder="Write something from the heart..."
              className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
              <Gift size={14} />
              Continue to Trip Selection
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* How it works */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted">How Gift Trips Work</h3>
        <div className="mt-4 grid grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "You buy",
              desc: "Choose a destination and budget. Pay upfront.",
            },
            {
              step: "02",
              title: "We hold",
              desc: "Funds are held securely until the recipient activates.",
            },
            {
              step: "03",
              title: "They activate",
              desc: "Recipient gets a Suitcase account and customizes their trip.",
            },
            {
              step: "04",
              title: "They travel",
              desc: "Full Suitcase coordination — flights, hotels, dining, activities.",
            },
          ].map((s, i) => (
            <div key={s.step} className="relative">
              <span className="text-xs font-medium text-accent">{s.step}</span>
              <h4 className="mt-1 font-semibold">{s.title}</h4>
              <p className="mt-1 text-xs text-muted">{s.desc}</p>
              {i < 3 && (
                <ArrowRight
                  size={14}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-border"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gift list */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Your Gifts</h2>
        <div className="space-y-3">
          {gifts.map((gift, i) => {
            const config = statusConfig[gift.status];
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-5 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm"
              >
                <img
                  src={gift.image}
                  alt={gift.destination}
                  className="h-20 w-28 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{gift.tripTitle}</h3>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
                    >
                      {config.icon}
                      {gift.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">
                    {gift.destination}
                  </p>
                  <p className="mt-2 text-sm italic text-muted">
                    &ldquo;{gift.message}&rdquo;
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    €{gift.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted">
                    {gift.occasion} &middot; {gift.from} &rarr; {gift.to}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <Calendar size={12} />
                    {new Date(gift.purchaseDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Float info */}
      <div className="rounded-xl border border-border bg-foreground/[0.02] p-6">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          <h3 className="text-sm font-medium">Float Revenue</h3>
        </div>
        <p className="mt-2 text-sm text-muted">
          Between purchase and activation, Suitcase holds the funds and earns
          the spread. Average float window: 45 days. This is captured
          automatically on every gift purchase.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted">Active float</p>
            <p className="mt-1 text-lg font-semibold">€3,200</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted">Avg. window</p>
            <p className="mt-1 text-lg font-semibold">45 days</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted">Earned (est.)</p>
            <p className="mt-1 text-lg font-semibold text-accent">€48</p>
          </div>
        </div>
      </div>
    </div>
  );
}
