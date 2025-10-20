import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  unitNumber: text("unit_number").notNull(),
  buildingName: text("building_name").notNull(),
  phone: text("phone"),
  email: text("email"),
});

export const requestStatusEnum = pgEnum("request_status", ["pending", "in_progress", "completed", "cancelled"]);
export const requestTypeEnum = pgEnum("request_type", ["maintenance", "cleaning", "technical", "other"]);

export const serviceRequests = pgTable("service_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: requestTypeEnum("type").notNull().default("other"),
  status: requestStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const visitors = pgTable("visitors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  visitorName: text("visitor_name").notNull(),
  visitorPhone: text("visitor_phone"),
  visitDate: timestamp("visit_date").notNull(),
  purpose: text("purpose"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const parcelStatusEnum = pgEnum("parcel_status", ["pending_pickup", "picked_up"]);

export const parcels = pgTable("parcels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tenantId: varchar("tenant_id").notNull().references(() => tenants.id),
  courierName: text("courier_name").notNull(),
  trackingNumber: text("tracking_number"),
  status: parcelStatusEnum("status").notNull().default("pending_pickup"),
  arrivedAt: timestamp("arrived_at").notNull().defaultNow(),
  pickedUpAt: timestamp("picked_up_at"),
});

export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const promos = pgTable("promos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schemas for validation
export const insertTenantSchema = createInsertSchema(tenants).omit({ id: true });
export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({ id: true, createdAt: true, updatedAt: true });
export const insertVisitorSchema = createInsertSchema(visitors).omit({ id: true, createdAt: true }).extend({
  visitDate: z.coerce.date(), // Accept string and convert to Date
});
export const insertParcelSchema = createInsertSchema(parcels).omit({ id: true, arrivedAt: true, pickedUpAt: true });
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true, createdAt: true, date: true });
export const insertPromoSchema = createInsertSchema(promos).omit({ id: true, createdAt: true });

// Types
export type Tenant = typeof tenants.$inferSelect;
export type InsertTenant = z.infer<typeof insertTenantSchema>;

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;

export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;

export type Parcel = typeof parcels.$inferSelect;
export type InsertParcel = z.infer<typeof insertParcelSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Promo = typeof promos.$inferSelect;
export type InsertPromo = z.infer<typeof insertPromoSchema>;
