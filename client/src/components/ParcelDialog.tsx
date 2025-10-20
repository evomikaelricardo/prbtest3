import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ParcelDialogProps {
  tenantId: string;
  children: React.ReactNode;
}

export default function ParcelDialog({ tenantId, children }: ParcelDialogProps) {
  const [open, setOpen] = useState(false);
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createParcel = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/parcels", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parcels", tenantId] });
      toast({ title: "Parcel registered successfully" });
      setOpen(false);
      setCourierName("");
      setTrackingNumber("");
    },
    onError: () => {
      toast({ title: "Failed to register parcel", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createParcel.mutate({
      tenantId,
      courierName,
      trackingNumber: trackingNumber || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="dialog-parcel">
        <DialogHeader>
          <DialogTitle>Register Parcel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="courierName">Courier/Delivery Service</Label>
            <Input
              id="courierName"
              data-testid="input-courier-name"
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              placeholder="e.g., JNE, GoSend, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
            <Input
              id="trackingNumber"
              data-testid="input-tracking-number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking/AWB number"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel-parcel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createParcel.isPending}
              data-testid="button-submit-parcel"
            >
              {createParcel.isPending ? "Registering..." : "Register Parcel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
