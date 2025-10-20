# Design Guidelines: Pakuwon Residence Bekasi Tenant App

## Design Approach
**Reference-Based Approach**: Drawing from the provided interface and modern property management apps (Airbnb, WeWork resident apps). This is a utility-focused mobile application with clean, accessible design prioritizing ease of use for daily tenant interactions.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary Blue: 203 65% 45% (Header gradient start)
- Primary Blue Light: 195 55% 65% (Header gradient end)
- Background: 0 0% 98%
- Card Background: 0 0% 100%
- Text Primary: 220 15% 20%
- Text Secondary: 220 10% 50%
- Success Green: 145 65% 45%
- Warning Orange: 35 85% 55%

**Dark Mode:**
- Primary Blue: 203 60% 55%
- Background: 220 15% 12%
- Card Background: 220 15% 16%
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%

### B. Typography

**Font Family:**
- Primary: 'Inter' (Google Fonts) for body text
- Headings: 'Poppins' (Google Fonts) for headers and navigation

**Scale:**
- Greeting/Headers: text-xl to text-2xl, font-semibold
- Unit Info: text-sm, font-medium
- Section Headers: text-lg, font-semibold
- Body Text: text-base
- Card Labels: text-sm, font-medium
- Navigation: text-xs

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8, 12
- Card Padding: p-4 to p-6
- Section Spacing: mb-6 to mb-8
- Grid Gaps: gap-3 to gap-4
- Container Padding: px-4

**Grid Structure:**
- Service Menu: grid-cols-3 (3 items per row)
- Facility Icons: grid-cols-5 (5 items per row)
- Property Info: grid-cols-2
- Announcements: Single column stack
- Bottom Navigation: 4 equal columns

### D. Component Library

**Header Section:**
- Blue gradient background (top to bottom, primary to light)
- White text with greeting "Hi, [Name]"
- Unit info badge with white background, rounded-full
- Height: Approximately 180px on mobile

**Service Cards:**
- White rounded-xl cards with subtle shadow (shadow-sm)
- Icon area: w-12 h-12, colored background circles matching service type
- Label below icon: text-sm, centered
- Tap target: minimum 56px height
- Grid layout with even spacing

**Facility Icons:**
- Circular icon containers (w-14 h-14)
- Light background tint matching icon color
- Text label below: text-xs, two-line max
- Horizontal scrollable row on mobile

**Property Info Cards:**
- White background, rounded-lg
- Icon + text layout
- Border-l-4 with accent color (blue, green, orange, red)
- Padding: p-4

**Announcement Cards:**
- White background, rounded-lg, shadow-sm
- Date badge: Small pill in top-right (text-xs, bg-gray-100)
- Image thumbnail: w-20 h-20, rounded-lg (if applicable)
- Title: font-semibold, text-base
- Preview text: text-sm, text-gray-600, line-clamp-2

**Promo Carousel:**
- Full-width cards with rounded-xl
- Image aspect ratio: 16:9 or 3:2
- Dots indicator below carousel
- Swipeable on mobile

**Bottom Navigation:**
- Fixed position at bottom
- White background with top border (border-t)
- Icons: w-6 h-6
- Labels: text-xs
- Active state: Primary blue color
- Inactive: Gray-500

### E. Interaction Patterns

**Buttons:**
- Primary: Blue background, white text, rounded-lg, shadow-sm
- Secondary: White background with blue border, rounded-lg
- Icon buttons: Circular touch targets, 44px minimum

**Navigation:**
- Bottom nav active state: Icon and text in primary blue with subtle background highlight
- Page transitions: Smooth fade or slide animations (150ms)

**Cards:**
- Tap feedback: Scale down slightly (scale-95) with 100ms transition
- Hover state (desktop): Lift effect with shadow-md

**Scrolling:**
- Facility icons: Horizontal scroll with momentum
- Announcements: Vertical scroll
- Hide scrollbars for clean appearance

## Images

**Promo/Highlight Section:**
- Carousel banners showcasing property amenities (pool, gym, lounge)
- Image style: High-quality lifestyle photography with soft lighting
- Dimensions: 1200x675px (16:9 aspect)
- 3-4 rotating images featuring facilities and resident perks

**Announcement Thumbnails:**
- Square or landscape thumbnails (300x300px or 400x300px)
- Event photos, maintenance notices, community updates
- Maintain consistent quality and lighting

**Property Info Icons:**
- Use Material Icons or Heroicons via CDN
- Colored to match section theme

## Accessibility & Responsiveness

- Maintain touch target minimum 44x44px
- Color contrast ratio minimum 4.5:1 for text
- Dark mode toggle in Account settings
- Support screen readers with proper ARIA labels
- Responsive breakpoints: Mobile-first (320px), Tablet (768px), Desktop (1024px)
- Safe areas for iOS notch and Android navigation

## Visual Hierarchy

1. **Primary Focus:** Header greeting and service menu (immediate access to key features)
2. **Secondary:** Facility management quick actions
3. **Tertiary:** Property info, announcements, promos
4. **Navigation:** Persistent bottom bar for context switching

The design emphasizes quick access to essential tenant services while maintaining a premium, modern aesthetic appropriate for luxury residence management.