import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import type { ServiceRequest, Visitor, Parcel } from "@shared/schema";

export default function MyActivity() {
  const [activeTab, setActiveTab] = useState("activity");
  const [viewMode, setViewMode] = useState<"requests" | "visitors" | "parcels">("requests");
  const tenantId = "tenant-1";

  const { data: requests = [] } = useQuery<ServiceRequest[]>({
    queryKey: ["/api/service-requests", tenantId],
  });

  const { data: visitors = [] } = useQuery<Visitor[]>({
    queryKey: ["/api/visitors", tenantId],
  });

  const { data: parcels = [] } = useQuery<Parcel[]>({
    queryKey: ["/api/parcels", tenantId],
  });

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "pending_pickup":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
      case "picked_up":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-white px-4 py-6">
        <Link href="/">
          <button data-testid="button-back" className="mb-4 hover-elevate active-elevate-2 p-2 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold font-heading">My Activity</h1>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            data-testid="button-view-requests"
            onClick={() => setViewMode("requests")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              viewMode === "requests"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover-elevate active-elevate-2"
            }`}
          >
            Service Requests ({requests.length})
          </button>
          <button
            data-testid="button-view-visitors"
            onClick={() => setViewMode("visitors")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              viewMode === "visitors"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover-elevate active-elevate-2"
            }`}
          >
            Visitors ({visitors.length})
          </button>
          <button
            data-testid="button-view-parcels"
            onClick={() => setViewMode("parcels")}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              viewMode === "parcels"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover-elevate active-elevate-2"
            }`}
          >
            Parcels ({parcels.length})
          </button>
        </div>

        <div className="space-y-3">
          {viewMode === "requests" && (
            <>
              {requests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No service requests yet</p>
              ) : (
                requests.map((request) => (
                  <div
                    key={request.id}
                    data-testid={`card-request-${request.id}`}
                    className="bg-card rounded-lg p-4 border border-border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{request.title}</h3>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="capitalize">{request.type}</span>
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {viewMode === "visitors" && (
            <>
              {visitors.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No visitors registered</p>
              ) : (
                visitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    data-testid={`card-visitor-${visitor.id}`}
                    className="bg-card rounded-lg p-4 border border-border"
                  >
                    <h3 className="font-semibold mb-2">{visitor.visitorName}</h3>
                    {visitor.visitorPhone && (
                      <p className="text-sm text-muted-foreground mb-1">{visitor.visitorPhone}</p>
                    )}
                    {visitor.purpose && (
                      <p className="text-sm text-muted-foreground mb-2">Purpose: {visitor.purpose}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{formatDate(visitor.visitDate)}</p>
                  </div>
                ))
              )}
            </>
          )}

          {viewMode === "parcels" && (
            <>
              {parcels.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No parcels tracked</p>
              ) : (
                parcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    data-testid={`card-parcel-${parcel.id}`}
                    className="bg-card rounded-lg p-4 border border-border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{parcel.courierName}</h3>
                      <Badge className={getStatusColor(parcel.status)}>
                        {parcel.status === "pending_pickup" ? "Pending" : "Picked Up"}
                      </Badge>
                    </div>
                    {parcel.trackingNumber && (
                      <p className="text-sm text-muted-foreground mb-2">Tracking: {parcel.trackingNumber}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Arrived: {formatDate(parcel.arrivedAt)}
                    </p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
