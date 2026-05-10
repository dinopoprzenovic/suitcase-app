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
    <div className="space-y-4">
      <PageHeader
        title="Suitcase Premium"
        subtitle="Ad-free travel, priority access, insurance, discounts."
      />

      {/* Plans — stacked vertically */}
      <div className="space-y-3">
        {premiumPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-lg border p-4 ${
              plan.highlighted
                ? "border-accent bg-gradient-to-b from-accent/5 to-transparent shadow-md shadow-accent/10"
                : "border-border bg-card"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-semibold text-white">
                Recommended
              </div>
            )}
            <div className="flex items-center gap-2">
              {plan.highlighted ? (
                <Crown size={16} className="text-accent" />
              ) : (
                <Star size={16} className="text-muted" />
              )}
              <h3 className="text-sm font-semibold">{plan.name}</h3>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-semibold">
                {plan.price === 0 ? "Free" : `€${plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-xs text-muted">/ {plan.period}</span>
              )}
            </div>
            <ul className="mt-3 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-accent" : "text-muted"}`}
                  />
                  <span className="text-xs">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "border border-border hover:bg-foreground/5"
              }`}
            >
              {plan.highlighted ? (
                <>
                  Upgrade to Premium
                  <ArrowRight size={12} />
                </>
              ) : (
                "Current Plan"
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Premium features — single column */}
      <div className="space-y-3">
        {[
          {
            icon: <Shield size={16} />,
            title: "Embedded Insurance",
            desc: "Every Premium trip includes travel insurance — cancellation, medical, and baggage protection.",
          },
          {
            icon: <Zap size={16} />,
            title: "Priority Access",
            desc: "Skip queues on popular restaurants and experiences. Early access to limited bookings.",
          },
          {
            icon: <Sparkles size={16} />,
            title: "AI Concierge",
            desc: "Advanced AI trip optimization with preference learning. The more you travel, the better it gets.",
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold">{feature.title}</h3>
            </div>
            <p className="mt-2 text-xs text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Assurance section */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-accent" />
          <div>
            <h3 className="text-sm font-semibold">Suitcase Assurance</h3>
            <p className="text-[11px] text-muted">
              Confidence priced into every itinerary
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-3">
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
              className="border-l-2 border-accent/30 pl-3"
            >
              <h4 className="text-xs font-semibold">{item.title}</h4>
              <p className="mt-0.5 text-[11px] text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
