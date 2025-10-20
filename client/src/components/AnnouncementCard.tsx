interface AnnouncementCardProps {
  title: string;
  date: string;
  onClick?: () => void;
}

export default function AnnouncementCard({ title, date, onClick }: AnnouncementCardProps) {
  return (
    <button
      data-testid="button-announcement"
      onClick={onClick || (() => console.log('Announcement clicked'))}
      className="w-full bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4 hover-elevate active-elevate-2 transition-all text-left"
    >
      <p className="text-sm font-medium text-foreground mb-2">{title}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </button>
  );
}
