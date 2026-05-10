import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string; // e.g. "+12%" or "-5%"
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-4">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-[#E8643A]/10 flex items-center justify-center text-[#E8643A]">
        {icon}
      </div>

      {/* Value + change */}
      <div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-semibold text-[#0A0A0A] tracking-tight leading-none">
            {value}
          </span>
          {change && (
            <span
              className={[
                'flex items-center gap-0.5 text-xs font-medium mb-0.5',
                isPositive ? 'text-[#22C55E]' : isNegative ? 'text-red-500' : 'text-[#737373]',
              ].join(' ')}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
        </div>
        <p className="text-sm text-[#737373] mt-1">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
