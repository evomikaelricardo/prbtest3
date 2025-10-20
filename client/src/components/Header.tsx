import { Bell } from "lucide-react";

interface HeaderProps {
  tenantName: string;
  unitInfo: string;
}

export default function Header({ tenantName, unitInfo }: HeaderProps) {
  return (
    <div className="relative bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white px-4 pt-6 pb-24 rounded-b-3xl">
      <div className="flex items-start justify-between mb-6">
        <div className="text-2xl font-semibold font-heading">p</div>
        <button 
          data-testid="button-notifications"
          className="p-2 hover-elevate active-elevate-2 rounded-lg"
          onClick={() => console.log('Notifications clicked')}
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Hi, {tenantName}!</h1>
        <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
          {unitInfo}
        </div>
      </div>
    </div>
  );
}
