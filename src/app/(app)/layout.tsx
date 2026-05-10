import { PhoneFrame } from "@/components/phone-frame";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto pt-12 pb-0">
          <div className="px-4 py-3">{children}</div>
        </main>
        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
