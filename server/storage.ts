import { 
  type Tenant, 
  type InsertTenant,
  type ServiceRequest,
  type InsertServiceRequest,
  type Visitor,
  type InsertVisitor,
  type Parcel,
  type InsertParcel,
  type Announcement,
  type InsertAnnouncement,
  type Promo,
  type InsertPromo
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Tenant methods
  getTenant(id: string): Promise<Tenant | undefined>;
  createTenant(tenant: InsertTenant): Promise<Tenant>;
  
  // Service Request methods
  getServiceRequests(tenantId: string): Promise<ServiceRequest[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  updateServiceRequestStatus(id: string, status: string): Promise<ServiceRequest | undefined>;
  
  // Visitor methods
  getVisitors(tenantId: string): Promise<Visitor[]>;
  createVisitor(visitor: InsertVisitor): Promise<Visitor>;
  
  // Parcel methods
  getParcels(tenantId: string): Promise<Parcel[]>;
  createParcel(parcel: InsertParcel): Promise<Parcel>;
  updateParcelStatus(id: string, status: string): Promise<Parcel | undefined>;
  
  // Announcement methods
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Promo methods
  getPromos(): Promise<Promo[]>;
  createPromo(promo: InsertPromo): Promise<Promo>;
}

export class MemStorage implements IStorage {
  private tenants: Map<string, Tenant>;
  private serviceRequests: Map<string, ServiceRequest>;
  private visitors: Map<string, Visitor>;
  private parcels: Map<string, Parcel>;
  private announcements: Map<string, Announcement>;
  private promos: Map<string, Promo>;

  constructor() {
    this.tenants = new Map();
    this.serviceRequests = new Map();
    this.visitors = new Map();
    this.parcels = new Map();
    this.announcements = new Map();
    this.promos = new Map();
    
    // Seed with default tenant
    const defaultTenant: Tenant = {
      id: "tenant-1",
      name: "John Smith",
      unitNumber: "Amor.05.07",
      buildingName: "Pakuwon Residence",
      phone: "+62 812-3456-7890" as string | null,
      email: "john.smith@example.com" as string | null,
    };
    this.tenants.set(defaultTenant.id, defaultTenant);
    
    // Seed with sample announcements
    const announcement1: Announcement = {
      id: randomUUID(),
      title: "Penutupan akses utama sementara",
      content: "Main entrance will be temporarily closed for maintenance work on May 13-14, 2025. Please use the side entrance during this period.",
      date: new Date("2025-05-13"),
      createdAt: new Date(),
    };
    const announcement2: Announcement = {
      id: randomUUID(),
      title: "Gym maintenance scheduled",
      content: "The gym will be closed for equipment maintenance on May 15, 2025 from 8 AM to 2 PM.",
      date: new Date("2025-05-15"),
      createdAt: new Date(),
    };
    this.announcements.set(announcement1.id, announcement1);
    this.announcements.set(announcement2.id, announcement2);
  }

  async getTenant(id: string): Promise<Tenant | undefined> {
    return this.tenants.get(id);
  }

  async createTenant(insertTenant: InsertTenant): Promise<Tenant> {
    const id = randomUUID();
    const tenant: Tenant = { 
      ...insertTenant, 
      id,
      phone: insertTenant.phone ?? null,
      email: insertTenant.email ?? null,
    };
    this.tenants.set(id, tenant);
    return tenant;
  }

  async getServiceRequests(tenantId: string): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values())
      .filter(req => req.tenantId === tenantId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const now = new Date();
    const request: ServiceRequest = { 
      ...insertRequest,
      type: insertRequest.type ?? "other",
      status: insertRequest.status ?? "pending",
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.serviceRequests.set(id, request);
    return request;
  }

  async updateServiceRequestStatus(id: string, status: string): Promise<ServiceRequest | undefined> {
    const request = this.serviceRequests.get(id);
    if (request) {
      const updated = { ...request, status: status as any, updatedAt: new Date() };
      this.serviceRequests.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async getVisitors(tenantId: string): Promise<Visitor[]> {
    return Array.from(this.visitors.values())
      .filter(visitor => visitor.tenantId === tenantId)
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  }

  async createVisitor(insertVisitor: InsertVisitor): Promise<Visitor> {
    const id = randomUUID();
    const visitor: Visitor = { 
      ...insertVisitor,
      visitorPhone: insertVisitor.visitorPhone ?? null,
      purpose: insertVisitor.purpose ?? null,
      id,
      createdAt: new Date(),
    };
    this.visitors.set(id, visitor);
    return visitor;
  }

  async getParcels(tenantId: string): Promise<Parcel[]> {
    return Array.from(this.parcels.values())
      .filter(parcel => parcel.tenantId === tenantId)
      .sort((a, b) => b.arrivedAt.getTime() - a.arrivedAt.getTime());
  }

  async createParcel(insertParcel: InsertParcel): Promise<Parcel> {
    const id = randomUUID();
    const parcel: Parcel = { 
      ...insertParcel,
      status: insertParcel.status ?? "pending_pickup",
      trackingNumber: insertParcel.trackingNumber ?? null,
      id,
      arrivedAt: new Date(),
      pickedUpAt: null,
    };
    this.parcels.set(id, parcel);
    return parcel;
  }

  async updateParcelStatus(id: string, status: string): Promise<Parcel | undefined> {
    const parcel = this.parcels.get(id);
    if (parcel) {
      const updated = { 
        ...parcel, 
        status: status as any,
        pickedUpAt: status === "picked_up" ? new Date() : parcel.pickedUpAt,
      };
      this.parcels.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = { 
      ...insertAnnouncement, 
      id,
      date: new Date(),
      createdAt: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async getPromos(): Promise<Promo[]> {
    return Array.from(this.promos.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createPromo(insertPromo: InsertPromo): Promise<Promo> {
    const id = randomUUID();
    const promo: Promo = { 
      ...insertPromo,
      description: insertPromo.description ?? null,
      id,
      createdAt: new Date(),
    };
    this.promos.set(id, promo);
    return promo;
  }
}

export const storage = new MemStorage();
