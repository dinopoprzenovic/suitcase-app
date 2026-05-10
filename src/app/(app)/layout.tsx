import { PhoneFrame } from "@/components/phone-frame";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto pt-14 pb-1">
          <div className="px-5 py-4">{children}</div>
        </main>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
