"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { ItineraryItem } from "@/components/itinerary-item";
import { BudgetRing } from "@/components/budget-ring";
import { trips } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Check,
  Heart,
} from "lucide-react";

const popularDestinations = [
  { name: "Lisbon", country: "Portugal", image: "https://picsum.photos/seed/lisbon-pop/400/250" },
  { name: "Barcelona", country: "Spain", image: "https://picsum.photos/seed/barcelona-pop/400/250" },
  { name: "Paris", country: "France", image: "https://picsum.photos/seed/paris-pop/400/250" },
  { name: "Rome", country: "Italy", image: "https://picsum.photos/seed/rome-pop/400/250" },
  { name: "Amsterdam", country: "Netherlands", image: "https://picsum.photos/seed/amsterdam-pop/400/250" },
  { name: "Prague", country: "Czech Republic", image: "https://picsum.photos/seed/prague-pop/400/250" },
];

export default function PlanPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 2000,
    travelers: 2,
    style: "balanced",
    isGift: false,
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const sampleTrip = trips[0];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  if (generated) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setGenerated(false);
              setStep(0);
            }}
            className="rounded-lg border border-border p-1.5 transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Your Trip to Lisbon</h1>
            <p className="text-xs text-muted">AI-generated itinerary</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-medium text-success">
            <Check size={10} className="mr-1 inline" />
            Optimized for €{form.budget.toLocaleString()}
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent">
            {sampleTrip.itinerary.length} days &middot; {sampleTrip.travelers} travelers
          </span>
        </div>

        {/* Budget ring card */}
        <div className="rounded-lg border border-border bg-card p-3">
          <h3 className="mb-3 text-xs font-medium text-muted">Budget Overview</h3>
          <BudgetRing
            spent={sampleTrip.budget.spent}
            total={sampleTrip.budget.total}
            currency={sampleTrip.budget.currency}
          />
        </div>

        {/* Itinerary */}
        <div className="space-y-3">
          {sampleTrip.itinerary.map((day) => (
            <div key={day.day}>
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
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <button className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            Book Entire Trip
          </button>
          <button className="w-full rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5">
            Save as Draft
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5">
            <Heart size={14} />
            Send as Gift
          </button>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Loader2 size={22} className="animate-spin text-accent" />
          </div>
          <h2 className="text-base font-semibold">Building your perfect trip...</h2>
          <p className="mt-1 text-xs text-muted">
            Coordinating flights, hotels, dining, and activities
          </p>
          <div className="mt-6 space-y-2">
            {[
              "Searching 200+ flight options",
              "Matching hotels to your style",
              "Reserving top-rated restaurants",
              "Optimizing for your budget",
            ].map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.6 }}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.6 + 0.3 }}
                >
                  <Check size={12} className="text-success" />
                </motion.div>
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Plan a Trip"
        subtitle="Tell us where you want to go."
      />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium">
                Where do you want to go?
              </label>
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                  placeholder="City, country, or 'surprise me'"
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium">
                Or pick a popular destination
              </label>
              <div className="grid grid-cols-2 gap-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.name}
                    onClick={() =>
                      setForm({ ...form, destination: dest.name })
                    }
                    className={`group relative overflow-hidden rounded-lg border transition-all ${
                      form.destination === dest.name
                        ? "border-accent ring-1 ring-accent"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-16 w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1.5 left-2">
                      <p className="text-xs font-medium text-white">
                        {dest.name}
                      </p>
                      <p className="text-[10px] text-white/70">{dest.country}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={!form.destination}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
            >
              Continue
              <ChevronRight size={14} />
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Start date
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-2 text-xs outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  End date
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-2 text-xs outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium">
                Budget per person
              </label>
              <div className="relative">
                <Wallet
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={100}
                value={form.budget}
                onChange={(e) =>
                  setForm({ ...form, budget: Number(e.target.value) })
                }
                className="mt-2 w-full accent-accent"
              />
              <div className="mt-0.5 flex justify-between text-[10px] text-muted">
                <span>€500</span>
                <span>€10,000</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium">
                Travelers
              </label>
              <div className="relative">
                <Users
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <select
                  value={form.travelers}
                  onChange={(e) =>
                    setForm({ ...form, travelers: Number(e.target.value) })
                  }
                  className="w-full appearance-none rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent"
                >
                  <option value={1}>1 traveler</option>
                  <option value={2}>2 travelers</option>
                  <option value={3}>3 travelers</option>
                  <option value={4}>4 travelers</option>
                  <option value={5}>5+ travelers (group)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(0)}
                className="rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Continue
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <div>
              <label className="mb-2 block text-xs font-medium">
                Travel style
              </label>
              <div className="space-y-2">
                {[
                  {
                    value: "budget",
                    label: "Budget",
                    desc: "Best value, local spots",
                  },
                  {
                    value: "balanced",
                    label: "Balanced",
                    desc: "Mix of comfort & value",
                  },
                  {
                    value: "premium",
                    label: "Premium",
                    desc: "Top restaurants & hotels",
                  },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setForm({ ...form, style: s.value })}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      form.style === s.value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium">
                Special options
              </label>
              <button
                onClick={() => setForm({ ...form, isGift: !form.isGift })}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 transition-all ${
                  form.isGift
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <Heart
                  size={16}
                  className={form.isGift ? "text-accent" : "text-muted"}
                />
                <div className="text-left">
                  <p className="text-sm font-medium">This is a gift</p>
                  <p className="text-xs text-muted">
                    Send this trip to someone special
                  </p>
                </div>
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-2 text-xs font-medium">Trip Summary</h3>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Destination</span>
                  <span className="font-medium">{form.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Budget</span>
                  <span className="font-medium">
                    €{form.budget.toLocaleString()} / person
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Travelers</span>
                  <span className="font-medium">{form.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Style</span>
                  <span className="font-medium capitalize">{form.style}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                <Sparkles size={14} />
                Generate Itinerary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              s === step ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
