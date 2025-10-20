import { LucideIcon } from "lucide-react";

interface PropertyInfoCardProps {
  icon: LucideIcon;
  title: string;
  borderColor: string;
  onClick?: () => void;
}

export default function PropertyInfoCard({ icon: Icon, title, borderColor, onClick }: PropertyInfoCardProps) {
  return (
    <button
      data-testid={`button-property-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick || (() => console.log(`${title} clicked`))}
      className={`flex flex-col items-center gap-2 p-4 bg-card rounded-lg border-l-4 ${borderColor} hover-elevate active-elevate-2 transition-all`}
    >
      <Icon className="w-8 h-8 text-primary" />
      <span className="text-xs text-center font-medium text-foreground">{title}</span>
    </button>
  );
}
