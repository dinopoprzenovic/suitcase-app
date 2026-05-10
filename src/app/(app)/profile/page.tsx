"use client";

import { mockUser } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import {
  User,
  Mail,
  Crown,
  MapPin,
  Globe,
  Utensils,
  Briefcase,
  CreditCard,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your account and travel preferences." />

      <div className="grid grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          {/* Profile card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-xl font-semibold text-accent">
                {mockUser.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{mockUser.name}</h3>
                <p className="text-sm text-muted">{mockUser.email}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Crown size={12} className="text-accent" />
                  <span className="text-xs font-medium text-accent">
                    Premium Member
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
              <div>
                <p className="text-xs text-muted">Trips Completed</p>
                <p className="mt-1 text-lg font-semibold">
                  {mockUser.tripsCompleted}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Member Since</p>
                <p className="mt-1 text-lg font-semibold">
                  {mockUser.memberSince}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Preferred Currency</p>
                <p className="mt-1 text-lg font-semibold">
                  {mockUser.preferences.currency}
                </p>
              </div>
            </div>
          </div>

          {/* Travel preferences */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Travel Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-muted" />
                  <div>
                    <p className="text-sm font-medium">Travel Style</p>
                    <p className="text-xs text-muted">How you prefer to travel</p>
                  </div>
                </div>
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-sm font-medium capitalize">
                  {mockUser.preferences.travelStyle}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={16} className="text-muted" />
                  <div>
                    <p className="text-sm font-medium">Budget Range</p>
                    <p className="text-xs text-muted">Default budget per trip</p>
                  </div>
                </div>
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-sm font-medium">
                  {mockUser.preferences.budgetRange}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Utensils size={16} className="text-muted" />
                  <div>
                    <p className="text-sm font-medium">Dietary Restrictions</p>
                    <p className="text-xs text-muted">Applied to dining recommendations</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {mockUser.preferences.dietaryRestrictions.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Settings</h3>
            <div className="space-y-1">
              {[
                { icon: <Bell size={16} />, label: "Notifications", desc: "Email and push notification preferences" },
                { icon: <Shield size={16} />, label: "Privacy & Security", desc: "Password, 2FA, data management" },
                { icon: <CreditCard size={16} />, label: "Payment Methods", desc: "Manage cards and payment options" },
                { icon: <Crown size={16} />, label: "Subscription", desc: "Manage your Premium membership" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-foreground/5"
                >
                  <span className="text-muted">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-center gap-2">
                <Crown size={16} className="text-accent" />
                <h3 className="text-sm font-medium">Premium Active</h3>
              </div>
              <p className="mt-2 text-xs text-muted">
                Your Premium membership renews on Jan 15, 2027.
                Ad-free experience, embedded insurance, and priority access included.
              </p>
              <div className="mt-3 rounded-lg bg-card p-3">
                <p className="text-xs text-muted">Monthly cost</p>
                <p className="text-lg font-semibold">€9.99</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-medium text-muted">
                Preference Learning
              </h3>
              <p className="text-xs text-muted">
                Suitcase learns from your trips to improve recommendations.
                The more you travel, the better your itineraries get.
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { label: "Cuisine match", value: 92 },
                  { label: "Budget accuracy", value: 87 },
                  { label: "Activity fit", value: 78 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted">{stat.label}</span>
                      <span className="font-medium">{stat.value}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-foreground/5">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/30 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger/5">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
