import { useState } from "react";
import { ArrowLeft, CreditCard, Calendar } from "lucide-react";
import { Link } from "wouter";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";

export default function Billing() {
  const [activeTab, setActiveTab] = useState("billing");

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-white px-4 py-6">
        <Link href="/">
          <button data-testid="button-back" className="mb-4 hover-elevate active-elevate-2 p-2 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold font-heading">Billing</h1>
      </div>

      <div className="px-4 py-6">
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Payment Information</h3>
              <p className="text-sm text-muted-foreground">Manage your billing details</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Your billing information will be displayed here.</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Payment History</h3>
              <p className="text-sm text-muted-foreground">View past transactions</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Your payment history will appear here.</p>
          </div>
        </Card>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
