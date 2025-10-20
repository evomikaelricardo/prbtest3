import PropertyInfoCard from '../PropertyInfoCard';
import { Home } from 'lucide-react';

export default function PropertyInfoCardExample() {
  return (
    <div className="p-4 bg-background">
      <PropertyInfoCard 
        icon={Home}
        title="About Property"
        borderColor="border-l-blue-500"
      />
    </div>
  );
}
