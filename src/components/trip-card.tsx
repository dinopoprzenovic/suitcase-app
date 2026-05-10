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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.05 }}
      whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
      className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden"
    >
      <Link href={`/trip/${trip.id}`} className="block group">
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-[#F5F5F5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trip.image}
            alt={`${trip.destination}, ${trip.country}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Status badge */}
          <span
            className={[
              'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold',
              status.classes,
            ].join(' ')}
          >
            {status.label}
          </span>

          {/* Gift / Group badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {trip.isGift && (
              <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-medium text-[#0A0A0A]">
                <Gift className="w-3 h-3 text-[#E8643A]" />
                Gift
              </span>
            )}
            {trip.isGroup && (
              <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-medium text-[#0A0A0A]">
                <Users className="w-3 h-3 text-[#E8643A]" />
                Group
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Destination */}
          <div>
            <h3 className="text-base font-semibold text-[#0A0A0A] leading-tight">
              {trip.title || trip.destination}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#737373]" />
              <span className="text-xs text-[#737373]">{trip.destination}, {trip.country}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDateRange(trip.dates.start, trip.dates.end)}</span>
          </div>

          {/* Budget bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#737373]">Budget used</span>
              <span className="font-medium text-[#0A0A0A]">
                {formatCurrency(trip.budget.spent, trip.budget.currency)}
                <span className="text-[#737373] font-normal">
                  {' '}/ {formatCurrency(trip.budget.total, trip.budget.currency)}
                </span>
              </span>
            </div>
            <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E8643A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${spentPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              />
            </div>
            <p className="text-[11px] text-[#737373]">
              {formatCurrency(remaining, trip.budget.currency)} remaining
            </p>
          </div>

          {/* Travelers */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373] pt-1 border-t border-[#F5F5F5]">
            <User className="w-3.5 h-3.5" />
            <span>
              {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default TripCard;
