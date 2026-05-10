"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Gift,
  Users,
  User,
} from "lucide-react";

const TABS = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Plan", href: "/plan", icon: Compass },
  { label: "Gifts", href: "/gifts", icon: Gift },
  { label: "Group", href: "/group", icon: Users },
  { label: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center justify-around bg-white border-t border-[#E5E5E5] px-2 pb-6 pt-2">
      {TABS.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <Icon
              size={20}
              strokeWidth={active ? 2.5 : 1.8}
              className={active ? "text-[#E8643A]" : "text-[#A3A3A3]"}
            />
            <span
              className={`text-[10px] font-medium ${
                active ? "text-[#E8643A]" : "text-[#A3A3A3]"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
