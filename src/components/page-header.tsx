import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between pb-6 border-b border-[#E5E5E5]">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[#737373]">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0 ml-4">{action}</div>
      )}
    </div>
  );
}

export { PageHeader };
