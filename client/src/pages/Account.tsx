import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User, Mail, Phone, Building } from "lucide-react";
import { Link } from "wouter";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import type { Tenant } from "@shared/schema";

export default function Account() {
  const [activeTab, setActiveTab] = useState("account");
  const tenantId = "tenant-1";

  const { data: tenant } = useQuery<Tenant>({
    queryKey: ["/api/tenant", tenantId],
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-white px-4 py-6">
        <Link href="/">
          <button data-testid="button-back" className="mb-4 hover-elevate active-elevate-2 p-2 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold font-heading">Account</h1>
      </div>

      <div className="px-4 py-6">
        <Card className="p-6 mb-4">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{tenant?.name || "Loading..."}</p>
              </div>
            </div>
            
            {tenant?.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{tenant.email}</p>
                </div>
              </div>
            )}
            
            {tenant?.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{tenant.phone}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Unit Information</h3>
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Unit</p>
              <p className="font-medium">
                {tenant?.buildingName || ""} {tenant?.unitNumber || ""}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
