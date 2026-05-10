'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Map,
  Gift,
  Users,
  Wallet,
  Crown,
  Luggage,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',    href: '/',        icon: LayoutDashboard },
  { label: 'Plan a Trip',  href: '/plan',    icon: Compass },
  { label: 'My Trips',     href: '/trips',   icon: Map },
  { label: 'Gifts',        href: '/gifts',   icon: Gift },
  { label: 'Group Travel', href: '/group',   icon: Users },
  { label: 'Budget',       href: '/budget',  icon: Wallet },
  { label: 'Premium',      href: '/premium', icon: Crown },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-white border-r border-[#E5E5E5] flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E8643A]/10">
          <Luggage className="w-[18px] h-[18px] text-[#E8643A]" strokeWidth={2} />
        </div>
        <span
          className="text-xl text-[#0A0A0A] tracking-tight"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          Suitcase
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-[#E8643A]/10 text-[#E8643A]'
                      : 'text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]',
                  ].join(' ')}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8643A] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold tracking-wide">DP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0A0A0A] truncate">Dino P.</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Crown className="w-3 h-3 text-[#E8643A]" strokeWidth={2} />
              <span className="text-[11px] font-medium text-[#E8643A]">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
