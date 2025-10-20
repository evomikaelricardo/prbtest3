# Pakuwon Residence Bekasi - Tenant Portal

## Overview

A luxury apartment tenant management portal for Pakuwon Residence Bekasi. This mobile-first web application enables residents to manage service requests, register visitors, track parcels, view announcements and promotions, and access property information. The application provides a modern, accessible interface inspired by property management platforms like Airbnb and WeWork resident apps.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- shadcn/ui (New York style) - composable, accessible React components built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for variant-based component styling
- Custom design system with:
  - Primary blue gradient header (HSL 203 65% 45% → 195 55% 65%)
  - Light/dark mode support via CSS variables
  - Inter font for body text, Poppins for headings
  - Consistent spacing primitives (3, 4, 6, 8, 12 Tailwind units)

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management with automatic caching, background refetching disabled
- Custom `apiRequest` utility for type-safe API calls with credential support
- React Hook Form with Zod resolvers for form validation

**Component Architecture**
- Reusable UI components: ServiceCard, FacilityIcon, PropertyInfoCard, AnnouncementCard, PromoCarousel
- Dialog-based interactions for service requests, visitor registration, and parcel management
- Bottom navigation for primary app sections (Home, My Activity, Billing, Account)
- Mobile-first responsive design with max-width constraints

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM module system for modern JavaScript syntax
- Custom middleware for request logging with response capture

**API Design**
- RESTful endpoints organized by resource:
  - `/api/tenant/:id` - Tenant information
  - `/api/service-requests/:tenantId` - Service request CRUD
  - `/api/visitors/:tenantId` - Visitor registration and retrieval
  - `/api/parcels/:tenantId` - Parcel tracking
  - `/api/announcements` - Property announcements
  - `/api/promos` - Promotional content

**Data Validation**
- Zod schemas for runtime type validation and type inference
- drizzle-zod integration for generating Zod schemas from database schema
- Input validation on all POST/PATCH endpoints

**Development Server Integration**
- Vite middleware integration in development mode for HMR
- Static file serving in production
- Separate client and server build processes

### Data Storage

**Database Strategy**
- PostgreSQL via Neon serverless driver (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with migrations generated via drizzle-kit

**Database Schema**
- `tenants` - Core tenant information (id, name, unit_number, building_name, contact info)
- `service_requests` - Maintenance/service requests with type and status enums
- `visitors` - Guest registration with visit dates and purposes
- `parcels` - Package tracking with courier details and pickup status
- `announcements` - Property-wide notifications
- `promos` - Promotional content and offers

**Storage Abstraction**
- `IStorage` interface defining all data operations
- `MemStorage` in-memory implementation for development/testing
- Designed for easy migration to database-backed storage
- UUID-based primary keys via PostgreSQL `gen_random_uuid()`

### External Dependencies

**UI & Component Libraries**
- Radix UI primitives (@radix-ui/*) - 25+ accessible component primitives
- Lucide React - Icon system
- Embla Carousel - Touch-enabled carousel for promo images
- React Day Picker - Date selection for visitor registration
- cmdk - Command palette component (if needed)

**Development & Build Tools**
- TypeScript for static type checking
- ESBuild for production server bundling
- PostCSS with Tailwind CSS and Autoprefixer
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)

**Database & Validation**
- Drizzle ORM with PostgreSQL dialect
- Zod for schema validation
- Neon serverless PostgreSQL driver
- connect-pg-simple for session management (configured but not fully implemented)

**Utilities**
- date-fns for date formatting and manipulation
- nanoid for ID generation
- clsx & tailwind-merge for conditional class composition