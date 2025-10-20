import { Home, FileText, CreditCard, User } from "lucide-react";
import { Link, useLocation } from "wouter";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [location] = useLocation();
  
  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "activity", label: "My Activity", icon: FileText, path: "/activity" },
    { id: "billing", label: "Billing", icon: CreditCard, path: "/billing" },
    { id: "account", label: "Account", icon: User, path: "/account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location === tab.path;
          
          return (
            <Link key={tab.id} href={tab.path}>
              <button
                data-testid={`button-nav-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 hover-elevate active-elevate-2 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
