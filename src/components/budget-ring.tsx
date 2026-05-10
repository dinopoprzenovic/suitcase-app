'use client';

import { motion } from 'framer-motion';

interface BudgetRingProps {
  spent: number;
  total: number;
  currency: string;
}

const RADIUS = 52;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BudgetRing({ spent, total, currency }: BudgetRingProps) {
  const remaining = Math.max(total - spent, 0);
  const percent = Math.min(spent / total, 1);
  const dashOffset = CIRCUMFERENCE * (1 - percent);
  const viewSize = (RADIUS + STROKE) * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: viewSize, height: viewSize }}>
        <svg
          width={viewSize}
          height={viewSize}
          viewBox={`0 0 ${viewSize} ${viewSize}`}
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx={viewSize / 2}
            cy={viewSize / 2}
            r={RADIUS}
            fill="none"
            stroke="#F5F5F5"
            strokeWidth={STROKE}
          />
          {/* Spent arc */}
          <motion.circle
            cx={viewSize / 2}
            cy={viewSize / 2}
            r={RADIUS}
            fill="none"
            stroke="#E8643A"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-base font-semibold text-[#0A0A0A] tracking-tight"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {formatCurrency(remaining, currency)}
          </motion.span>
          <motion.span
            className="text-[10px] text-[#737373] mt-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            remaining
          </motion.span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E8643A]" />
          <span className="text-[#737373]">Spent</span>
          <span className="font-medium text-[#0A0A0A]">{formatCurrency(spent, currency)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F5F5F5] border border-[#E5E5E5]" />
          <span className="text-[#737373]">Total</span>
          <span className="font-medium text-[#0A0A0A]">{formatCurrency(total, currency)}</span>
        </div>
      </div>
    </div>
  );
}

export default BudgetRing;
