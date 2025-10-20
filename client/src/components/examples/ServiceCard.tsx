import ServiceCard from '../ServiceCard';
import { FileText } from 'lucide-react';

export default function ServiceCardExample() {
  return (
    <div className="p-4 bg-background">
      <ServiceCard 
        icon={FileText}
        label="Make Request"
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
}
