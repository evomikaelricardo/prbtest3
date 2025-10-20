import FacilityIcon from '../FacilityIcon';
import { Wrench } from 'lucide-react';

export default function FacilityIconExample() {
  return (
    <div className="p-4 bg-background">
      <FacilityIcon 
        icon={Wrench}
        label="Engineering"
        iconBgColor="bg-cyan-100 dark:bg-cyan-900/30"
        iconColor="text-cyan-600 dark:text-cyan-400"
      />
    </div>
  );
}
