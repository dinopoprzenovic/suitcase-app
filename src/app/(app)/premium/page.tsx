"use client";

import { premiumPlans } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Shield,
  Zap,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Suitcase Premium"
        subtitle="Upgrade for ad-free travel, priority access, embedded insurance, and partner discounts."
      />

      {/* Plans */}
      <div className="mx-auto grid max-w-[800px] grid-cols-2 gap-6">
        {premiumPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border p-7 ${
              plan.highlighted
                ? "border-accent bg-gradient-to-b from-accent/5 to-transparent shadow-lg shadow-accent/10"
                : "border-border bg-card"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                Recommended
              </div>
            )}
            <div className="flex items-center gap-2">
              {plan.highlighted ? (
                <Crown size={20} className="text-accent" />
              ) : (
                <Star size={20} className="text-muted" />
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">
                {plan.price === 0 ? "Free" : `€${plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-sm text-muted">/ {plan.period}</span>
              )}
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check
                    size={16}
                    className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-accent" : "text-muted"}`}
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "border border-border hover:bg-foreground/5"
              }`}
            >
              {plan.highlighted ? (
                <>
                  Upgrade to Premium
                  <ArrowRight size={14} />
                </>
              ) : (
                "Current Plan"
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Premium features detail */}
      <div className="grid grid-cols-3 gap-5">
        {[
          {
            icon: <Shield size={20} />,
            title: "Embedded Insurance",
            desc: "Every Premium trip includes travel insurance — cancellation protection, medical coverage, and baggage protection. No separate purchase needed.",
          },
          {
            icon: <Zap size={20} />,
            title: "Priority Access",
            desc: "Skip the queue on popular restaurants, activities, and experiences. Premium users get early access to limited-availability bookings.",
          },
          {
            icon: <Sparkles size={20} />,
            title: "AI Concierge",
            desc: "Advanced AI trip optimization with preference learning across trips. The more you travel, the better Suitcase knows you.",
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Assurance section */}
      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold">Suitcase Assurance</h3>
            <p className="text-sm text-muted">
              Confidence priced into every itinerary
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {[
            {
              title: "Free Cancellation",
              desc: "Cancel most bookings penalty-free up to 48 hours before departure.",
            },
            {
              title: "Change Protection",
              desc: "Modify dates, destinations, or services with minimal fees.",
            },
            {
              title: "Verified Network",
              desc: "Every vendor in Suitcase is vetted and rated. No surprises.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-l-2 border-accent/30 pl-4"
            >
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="mt-1 text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
