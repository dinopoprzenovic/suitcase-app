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
    <div className={`flex items-center gap-4 py-4 ${isLast ? '' : 'border-b border-[#F5F5F5]'}`}>
      {/* Type icon */}
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${color}`} strokeWidth={2} />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#0A0A0A] truncate">{item.title}</p>
        <p className="text-xs text-[#737373] truncate mt-0.5">{item.subtitle}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-[11px] text-[#737373]">
            <Clock className="w-3 h-3" />
            {item.time}{item.duration ? ` · ${item.duration}` : ''}
          </span>
          {item.location && (
            <span className="flex items-center gap-1 text-[11px] text-[#737373] truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {item.location}
            </span>
          )}
        </div>
      </div>

      {/* Right: cost + status */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-sm font-semibold text-[#0A0A0A]">
          {item.cost > 0 ? formatCurrency(item.cost, item.currency) : '—'}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusStyle}`}>
          {item.status}
        </span>
      </div>
    </div>
  );
}

export default ItineraryItem;
