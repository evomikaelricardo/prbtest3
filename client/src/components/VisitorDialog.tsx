import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface VisitorDialogProps {
  tenantId: string;
  children: React.ReactNode;
}

export default function VisitorDialog({ tenantId, children }: VisitorDialogProps) {
  const [open, setOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createVisitor = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/visitors", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/visitors", tenantId] });
      toast({ title: "Visitor registered successfully" });
      setOpen(false);
      setVisitorName("");
      setVisitorPhone("");
      setVisitDate("");
      setPurpose("");
    },
    onError: () => {
      toast({ title: "Failed to register visitor", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVisitor.mutate({
      tenantId,
      visitorName,
      visitorPhone: visitorPhone || null,
      visitDate: new Date(visitDate).toISOString(),
      purpose: purpose || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-testid="dialog-visitor">
        <DialogHeader>
          <DialogTitle>Register Visitor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitorName">Visitor Name</Label>
            <Input
              id="visitorName"
              data-testid="input-visitor-name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="Enter visitor's full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitorPhone">Phone Number (Optional)</Label>
            <Input
              id="visitorPhone"
              data-testid="input-visitor-phone"
              type="tel"
              value={visitorPhone}
              onChange={(e) => setVisitorPhone(e.target.value)}
              placeholder="+62 xxx-xxxx-xxxx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate">Visit Date & Time</Label>
            <Input
              id="visitDate"
              data-testid="input-visit-date"
              type="datetime-local"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose (Optional)</Label>
            <Input
              id="purpose"
              data-testid="input-visit-purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Family visit, Delivery, etc."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel-visitor"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createVisitor.isPending}
              data-testid="button-submit-visitor"
            >
              {createVisitor.isPending ? "Registering..." : "Register Visitor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
