import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  label: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

export default function ServiceCard({ icon: Icon, label, iconBgColor, iconColor, onClick }: ServiceCardProps) {
  return (
    <button
      data-testid={`button-service-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick || (() => console.log(`${label} clicked`))}
      className="flex flex-col items-center gap-2 p-3 hover-elevate active-elevate-2 rounded-xl transition-all"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <span className="text-xs text-center font-medium text-foreground leading-tight">{label}</span>
    </button>
  );
}
