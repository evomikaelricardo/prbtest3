import { LucideIcon } from "lucide-react";

interface FacilityIconProps {
  icon: LucideIcon;
  label: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

export default function FacilityIcon({ icon: Icon, label, iconBgColor, iconColor, onClick }: FacilityIconProps) {
  return (
    <button
      data-testid={`button-facility-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick || (() => console.log(`${label} clicked`))}
      className="flex flex-col items-center gap-1.5 hover-elevate active-elevate-2 rounded-lg p-2 transition-all"
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBgColor}`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <span className="text-xs text-center font-medium text-foreground leading-tight max-w-[70px]">{label}</span>
    </button>
  );
}
