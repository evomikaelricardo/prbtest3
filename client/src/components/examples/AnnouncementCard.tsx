import AnnouncementCard from '../AnnouncementCard';

export default function AnnouncementCardExample() {
  return (
    <div className="p-4 bg-background">
      <AnnouncementCard 
        title="Penutupan akses utama sementara"
        date="13 May 2025"
      />
    </div>
  );
}
