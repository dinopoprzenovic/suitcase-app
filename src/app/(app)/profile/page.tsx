"use client";

import { mockUser } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import {
  Crown,
  Globe,
  Utensils,
  CreditCard,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-3">
      <PageHeader title="Profile" subtitle="Manage your account and preferences." />

      {/* Profile card */}
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-base font-semibold text-accent">
            {mockUser.avatar}
          </div>
          <div>
            <h3 className="text-sm font-semibold">{mockUser.name}</h3>
            <p className="text-xs text-muted">{mockUser.email}</p>
            <div className="mt-0.5 flex items-center gap-1">
              <Crown size={10} className="text-accent" />
              <span className="text-[10px] font-medium text-accent">
                Premium Member
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3">
          <div>
            <p className="text-[10px] text-muted">Trips</p>
            <p className="mt-0.5 text-sm font-semibold">
              {mockUser.tripsCompleted}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted">Since</p>
            <p className="mt-0.5 text-sm font-semibold">
              {mockUser.memberSince}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted">Currency</p>
            <p className="mt-0.5 text-sm font-semibold">
              {mockUser.preferences.currency}
            </p>
          </div>
        </div>
      </div>

      {/* Premium status */}
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
        <div className="flex items-center gap-2">
          <Crown size={14} className="text-accent" />
          <h3 className="text-xs font-medium">Premium Active</h3>
        </div>
        <p className="mt-1.5 text-[11px] text-muted">
          Renews Jan 15, 2027. Ad-free, insurance, priority access included.
        </p>
        <div className="mt-2 rounded-lg bg-card p-2">
          <p className="text-[10px] text-muted">Monthly cost</p>
          <p className="text-sm font-semibold">€9.99</p>
        </div>
      </div>

      {/* Travel preferences */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="mb-3 text-sm font-semibold">Travel Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium">Travel Style</p>
                <p className="text-[10px] text-muted">How you prefer to travel</p>
              </div>
            </div>
            <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium capitalize">
              {mockUser.preferences.travelStyle}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <CreditCard size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium">Budget Range</p>
                <p className="text-[10px] text-muted">Default per trip</p>
              </div>
            </div>
            <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium">
              {mockUser.preferences.budgetRange}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium">Dietary</p>
                <p className="text-[10px] text-muted">Applied to dining</p>
              </div>
            </div>
            <div className="flex gap-1">
              {mockUser.preferences.dietaryRestrictions.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preference learning */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="mb-2 text-xs font-medium text-muted">
          Preference Learning
        </h3>
        <p className="text-[11px] text-muted">
          Suitcase learns from your trips to improve recommendations.
        </p>
        <div className="mt-3 space-y-2">
          {[
            { label: "Cuisine match", value: 92 },
            { label: "Budget accuracy", value: 87 },
            { label: "Activity fit", value: 78 },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-muted">{stat.label}</span>
                <span className="font-medium">{stat.value}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-foreground/5">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-lg border border-border bg-card p-3">
        <h3 className="mb-2 text-sm font-semibold">Settings</h3>
        <div className="space-y-0.5">
          {[
            { icon: <Bell size={14} />, label: "Notifications", desc: "Email and push preferences" },
            { icon: <Shield size={14} />, label: "Privacy & Security", desc: "Password, 2FA, data" },
            { icon: <CreditCard size={14} />, label: "Payment Methods", desc: "Manage cards" },
            { icon: <Crown size={14} />, label: "Subscription", desc: "Manage Premium" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors hover:bg-foreground/5"
            >
              <span className="text-muted">{item.icon}</span>
              <div>
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-[10px] text-muted">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-danger/30 py-2.5 text-xs font-medium text-danger transition-colors hover:bg-danger/5">
        <LogOut size={12} />
        Sign Out
      </button>
    </div>
  );
}
