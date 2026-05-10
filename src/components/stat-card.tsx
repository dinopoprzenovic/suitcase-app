import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg p-2.5 space-y-1.5">
      <div className="w-7 h-7 rounded-full bg-[#E8643A]/10 flex items-center justify-center text-[#E8643A]">
        {icon}
      </div>
      <div>
        <span className="text-base font-semibold text-[#0A0A0A] leading-none">{value}</span>
        <p className="text-[10px] text-[#737373] mt-0.5">{label}</p>
        {change && <p className="text-[9px] text-[#737373] mt-0.5">{change}</p>}
      </div>
    </div>
  );
}

export default StatCard;
