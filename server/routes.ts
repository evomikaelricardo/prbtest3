import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceRequestSchema, 
  insertVisitorSchema, 
  insertParcelSchema,
  insertAnnouncementSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tenant routes
  app.get("/api/tenant/:id", async (req, res) => {
    try {
      const tenant = await storage.getTenant(req.params.id);
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      res.json(tenant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tenant" });
    }
  });

  // Service Request routes
  app.get("/api/service-requests/:tenantId", async (req, res) => {
    try {
      const requests = await storage.getServiceRequests(req.params.tenantId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service requests" });
    }
  });

  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const request = await storage.createServiceRequest(validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/service-requests/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await storage.updateServiceRequestStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ error: "Request not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  // Visitor routes
  app.get("/api/visitors/:tenantId", async (req, res) => {
    try {
      const visitors = await storage.getVisitors(req.params.tenantId);
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch visitors" });
    }
  });

  app.post("/api/visitors", async (req, res) => {
    try {
      const validatedData = insertVisitorSchema.parse(req.body);
      const visitor = await storage.createVisitor(validatedData);
      res.json(visitor);
    } catch (error) {
      res.status(400).json({ error: "Invalid visitor data" });
    }
  });

  // Parcel routes
  app.get("/api/parcels/:tenantId", async (req, res) => {
    try {
      const parcels = await storage.getParcels(req.params.tenantId);
      res.json(parcels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch parcels" });
    }
  });

  app.post("/api/parcels", async (req, res) => {
    try {
      const validatedData = insertParcelSchema.parse(req.body);
      const parcel = await storage.createParcel(validatedData);
      res.json(parcel);
    } catch (error) {
      res.status(400).json({ error: "Invalid parcel data" });
    }
  });

  app.patch("/api/parcels/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await storage.updateParcelStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ error: "Parcel not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  // Announcement routes
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedData);
      res.json(announcement);
    } catch (error) {
      res.status(400).json({ error: "Invalid announcement data" });
    }
  });

  // Promo routes
  app.get("/api/promos", async (req, res) => {
    try {
      const promos = await storage.getPromos();
      res.json(promos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
