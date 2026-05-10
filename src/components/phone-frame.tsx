"use client";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen py-6">
      <div className="relative w-[390px] h-[844px] rounded-[50px] bg-black shadow-2xl shadow-black/60 border-[3px] border-[#2a2a2a] overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[10px]">
          <div className="w-[126px] h-[36px] bg-black rounded-full" />
        </div>

        {/* Status bar area (time + icons on sides of dynamic island) */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-[16px] text-white text-[12px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="4" width="3" height="8" rx="0.5"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3"/></svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="white"><path d="M7.5 3.5C9.4 3.5 11.1 4.3 12.3 5.5L13.7 4.1C12.1 2.5 9.9 1.5 7.5 1.5C5.1 1.5 2.9 2.5 1.3 4.1L2.7 5.5C3.9 4.3 5.6 3.5 7.5 3.5ZM7.5 7C8.6 7 9.6 7.5 10.3 8.2L11.7 6.8C10.6 5.7 9.1 5 7.5 5C5.9 5 4.4 5.7 3.3 6.8L4.7 8.2C5.4 7.5 6.4 7 7.5 7ZM7.5 10.5C8.3 10.5 9 9.8 9 9C9 8.2 8.3 7.5 7.5 7.5C6.7 7.5 6 8.2 6 9C6 9.8 6.7 10.5 7.5 10.5Z" opacity="0.9"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="white" strokeOpacity="0.35"/><rect x="22.5" y="3.5" width="1.5" height="5" rx="0.5" fill="white" fillOpacity="0.4"/><rect x="2" y="2" width="14" height="8" rx="1" fill="#34C759"/></svg>
          </span>
        </div>

        {/* Screen content */}
        <div className="w-full h-full bg-[#FAFAFA] overflow-hidden rounded-[47px]">
          {children}
        </div>

        {/* Bottom home indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/40 rounded-full z-50" />
      </div>
    </div>
  );
}
