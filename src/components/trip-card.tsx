'use client';

import Link from 'next/link';
import { Gift, Users, MapPin, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Trip, TripStatus } from '@/lib/data';

const STATUS_STYLES: Record<TripStatus, { label: string; classes: string }> = {
  upcoming:  { label: 'Upcoming',  classes: 'bg-blue-50 text-blue-600' },
  active:    { label: 'Active',    classes: 'bg-[#22C55E]/10 text-[#22C55E]' },
  completed: { label: 'Completed', classes: 'bg-[#F5F5F5] text-[#737373]' },
  draft:     { label: 'Draft',     classes: 'bg-[#F5F5F5] text-[#737373]' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-50 text-red-500' },
};

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface TripCardProps {
  trip: Trip;
  index?: number;
}

export function TripCard({ trip, index = 0 }: TripCardProps) {
  const status = STATUS_STYLES[trip.status] ?? STATUS_STYLES.draft;
  const spentPercent = Math.min((trip.budget.spent / trip.budget.total) * 100, 100);
  const remaining = trip.budget.total - trip.budget.spent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.05 }}
      className="rounded-lg border border-[#E5E5E5] bg-white overflow-hidden"
    >
      <Link href={`/trip/${trip.id}`} className="flex gap-3 p-3">
        {/* Image */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trip.image}
            alt={`${trip.destination}, ${trip.country}`}
            className="w-full h-full object-cover"
          />
          {/* Status badge */}
          <span
            className={[
              'absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold',
              status.classes,
            ].join(' ')}
          >
            {status.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-[#0A0A0A] leading-tight truncate">
                {trip.title || trip.destination}
              </h3>
              {trip.isGift && <Gift className="w-3 h-3 text-[#E8643A] shrink-0" />}
              {trip.isGroup && <Users className="w-3 h-3 text-[#E8643A] shrink-0" />}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#737373]" />
              <span className="text-[11px] text-[#737373] truncate">{trip.destination}, {trip.country}</span>
            </div>
          </div>

          {/* Budget bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#737373]">
                {formatCurrency(trip.budget.spent, trip.budget.currency)} / {formatCurrency(trip.budget.total, trip.budget.currency)}
              </span>
              <span className="text-[#737373]">
                <User className="w-3 h-3 inline mr-0.5" />
                {trip.travelers}
              </span>
            </div>
            <div className="h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E8643A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${spentPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default TripCard;
