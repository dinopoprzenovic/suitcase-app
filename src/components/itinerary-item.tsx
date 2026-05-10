import { Plane, Hotel, UtensilsCrossed, Ticket, Car, Clock, MapPin } from 'lucide-react';
import type { ItineraryItem, ItineraryItemType } from '@/lib/data';

export type { ItineraryItemType };

const TYPE_CONFIG: Record<
  ItineraryItemType,
  { icon: React.FC<{ className?: string; strokeWidth?: number }>; bg: string; color: string }
> = {
  flight:   { icon: Plane,            bg: 'bg-blue-50',      color: 'text-blue-500' },
  hotel:    { icon: Hotel,            bg: 'bg-purple-50',    color: 'text-purple-500' },
  dining:   { icon: UtensilsCrossed,  bg: 'bg-amber-50',     color: 'text-amber-500' },
  activity: { icon: Ticket,           bg: 'bg-emerald-50',   color: 'text-emerald-500' },
  mobility: { icon: Car,              bg: 'bg-[#E8643A]/10', color: 'text-[#E8643A]' },
};

const STATUS_STYLES: Record<ItineraryItem['status'], string> = {
  confirmed: 'bg-[#22C55E]/10 text-[#22C55E]',
  pending:   'bg-[#F59E0B]/10 text-[#F59E0B]',
  flexible:  'bg-blue-50 text-blue-500',
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ItineraryItemProps {
  item: ItineraryItem;
  isLast?: boolean;
}

export function ItineraryItem({ item, isLast }: ItineraryItemProps) {
  const { icon: Icon, bg, color } = TYPE_CONFIG[item.type];
  const statusStyle = STATUS_STYLES[item.status] ?? STATUS_STYLES.pending;

  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 ${isLast ? '' : 'border-b border-[#F5F5F5]'}`}>
      {/* Type icon */}
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} strokeWidth={2} />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[#0A0A0A] truncate">{item.title}</p>
        <p className="text-[11px] text-[#737373] truncate mt-0.5">{item.subtitle}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-0.5 text-[10px] text-[#737373]">
            <Clock className="w-2.5 h-2.5" />
            {item.time}{item.duration ? ` · ${item.duration}` : ''}
          </span>
          {item.location && (
            <span className="flex items-center gap-0.5 text-[10px] text-[#737373] truncate">
              <MapPin className="w-2.5 h-2.5 shrink-0" />
              {item.location}
            </span>
          )}
        </div>
      </div>

      {/* Right: cost + status */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs font-semibold text-[#0A0A0A]">
          {item.cost > 0 ? formatCurrency(item.cost, item.currency) : '—'}
        </span>
        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold capitalize ${statusStyle}`}>
          {item.status}
        </span>
      </div>
    </div>
  );
}

export default ItineraryItem;
