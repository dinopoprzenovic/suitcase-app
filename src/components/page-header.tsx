import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div>
        <h1 className="text-base font-semibold text-[#0A0A0A]">{title}</h1>
        {subtitle && <p className="text-[11px] text-[#737373] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 ml-3">{action}</div>}
    </div>
  );
}

export { PageHeader };
