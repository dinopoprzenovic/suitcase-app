"use client";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="relative w-[390px] h-[844px] rounded-[50px] bg-black shadow-2xl shadow-black/60 border-[3px] border-[#2a2a2a] overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[10px]">
          <div className="w-[126px] h-[36px] bg-black rounded-full" />
        </div>

        {/* Screen content */}
        <div className="w-full h-full bg-[#FAFAFA] overflow-hidden rounded-[47px]">
          {children}
        </div>

        {/* Bottom home indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50" />
      </div>
    </div>
  );
}
