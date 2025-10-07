# Student Engagement Monitor - Design Guidelines

## Design Approach: Modern Dashboard System

**Selected Approach:** Design System (Utility-Focused Dashboard)

**Rationale:** This is a real-time monitoring and analytics tool where clarity, data readability, and functional performance are paramount. Drawing inspiration from Linear, Vercel Dashboard, and modern SaaS analytics platforms that balance clean aesthetics with information density.

**Core Principles:**
- Data clarity over decoration
- Immediate actionability for teachers
- Calm, professional monitoring environment
- Real-time feedback without visual chaos

---

## Color Palette

### Dark Mode (Primary)
- **Background Base:** 220 15% 8% (deep charcoal)
- **Background Elevated:** 220 15% 12% (card surfaces)
- **Background Subtle:** 220 15% 16% (hover states)
- **Border Default:** 220 15% 20%
- **Border Emphasis:** 220 15% 30%
- **Text Primary:** 220 15% 95%
- **Text Secondary:** 220 10% 70%
- **Text Muted:** 220 10% 50%

### Light Mode
- **Background Base:** 0 0% 100%
- **Background Elevated:** 220 15% 98%
- **Background Subtle:** 220 15% 95%
- **Border Default:** 220 15% 88%
- **Text Primary:** 220 15% 10%
- **Text Secondary:** 220 10% 35%

### Engagement Status Colors
- **High Engagement (70%+):** 142 76% 45% (vibrant green)
- **Moderate (40-70%):** 38 92% 50% (warm amber)
- **Low (<40%):** 0 72% 51% (alert red)
- **Neutral Data:** 217 91% 60% (professional blue)

### Accent Colors
- **Primary Action:** 217 91% 60% (calm blue - use sparingly for CTAs)
- **Alert/Warning:** 0 72% 51% (only for critical alerts)
- **Success Indicators:** 142 76% 45%

---

## Typography

**Font Families:**
- **Primary:** Inter (Google Fonts) - UI text, metrics, labels
- **Monospace:** JetBrains Mono - Data values, timestamps, counts

**Type Scale:**
- **Hero Metric:** text-6xl font-bold (60px) - Main engagement percentage
- **Section Headers:** text-2xl font-semibold (24px)
- **Card Titles:** text-lg font-medium (18px)
- **Body Text:** text-base (16px)
- **Labels/Captions:** text-sm (14px)
- **Micro Text:** text-xs (12px) - Timestamps, metadata

**Font Weights:**
- Bold (700): Hero metrics, critical alerts
- Semibold (600): Section headers
- Medium (500): Card titles, labels
- Regular (400): Body text, descriptions

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: 2, 4
- Component padding: 6, 8
- Section gaps: 12, 16
- Major spacing: 20, 24

**Grid Structure:**
- **Main Dashboard:** 2-column grid on desktop (lg:grid-cols-2), single column on mobile
- **Metrics Row:** 3-column grid (grid-cols-3) for top-level stats
- **Container Max Width:** max-w-7xl with px-6 for consistent gutters

---

## Component Library

### Navigation
- **Fixed Top Bar:** Dark semi-transparent background with backdrop blur
- **Logo/Title:** Left-aligned with app name
- **Session Controls:** Right-aligned (Start/Stop session, Settings icon)
- **Height:** h-16 with border-b

### Dashboard Cards
- **Container:** Rounded corners (rounded-xl), elevated background
- **Padding:** p-6 for content, p-8 for featured cards
- **Border:** 1px solid border color
- **Shadow:** Subtle shadow on hover (transition-shadow)

### Video Feed Component
- **Aspect Ratio:** 16:9 maintained
- **Border:** 2px solid, color changes with engagement level
- **Overlay:** Face detection boxes in real-time
- **Position:** Left column on desktop, top on mobile

### Engagement Metrics Card
- **Large Percentage Display:** Center-aligned, color-coded
- **Ring Indicator:** Circular progress ring around percentage
- **Label Below:** "Class Engagement" in secondary text
- **Size:** Prominent placement, h-64 minimum

### Student Count & Session Timer
- **Layout:** Side-by-side metrics (grid-cols-2)
- **Icon:** User icon for count, clock for timer
- **Value:** Large monospace font
- **Label:** Small caps, secondary color

### Engagement Chart
- **Library:** Recharts with area chart
- **Height:** h-80 for readability
- **X-Axis:** Time labels (HH:MM format)
- **Y-Axis:** Percentage (0-100%)
- **Fill:** Gradient based on current engagement level
- **Stroke:** 2px line with smooth curve
- **Grid:** Subtle horizontal lines only

### Individual Student Emotions
- **Layout:** Grid of student cards (grid-cols-2 md:grid-cols-4)
- **Card Content:** Face thumbnail, detected emotion, confidence %
- **Emotion Label:** Color-coded badge
- **Border:** Subtle, changes with emotion intensity

### Alert Toast System
- **Position:** Top-right corner (fixed positioning)
- **Appearance:** Slide in from right with backdrop blur
- **Background:** Alert red with 90% opacity
- **Icon:** Warning triangle icon
- **Dismissible:** X button in corner
- **Auto-dismiss:** 8 seconds with progress bar

### Buttons
- **Primary:** Blue background, white text, rounded-lg, px-6 py-3
- **Secondary:** Border only (variant="outline"), background hover
- **Icon Buttons:** p-2, rounded-full, icon-only for controls

### Form Elements (Settings/Config)
- **Inputs:** Dark background, light border, rounded-md, p-3
- **Labels:** text-sm, mb-2, secondary color
- **Sliders:** For threshold configuration (40-80% range)

---

## Interactions & Animations

**Minimize Animations:**
- Card hover: Subtle shadow transition (300ms)
- Button clicks: Scale 0.98 feedback
- Chart updates: Smooth line transitions (500ms ease-in-out)
- Alert appearance: Slide-in only (no exit animation)
- Real-time data: No animation - instant updates

**No Animations:**
- Page transitions
- Metric changes (instant updates critical for monitoring)
- Face detection overlays (real-time drawing)

---

## Images

**No Hero Images Required** - This is a functional dashboard, not a marketing page.

**Images Used:**
1. **Placeholder Avatars:** Generic student silhouettes when face not detected (grayscale circular images)
2. **Webcam Feed:** Live video stream (primary visual element)
3. **Optional:** Small logo/icon in top navigation (32x32px, SVG preferred)

---

## Responsive Behavior

**Desktop (lg: 1024px+):**
- 2-column main layout (video left, metrics right)
- 3-column metrics row
- Chart full-width below fold

**Tablet (md: 768px):**
- Single column stacked
- Video feed at top
- 2-column metrics grid

**Mobile (base):**
- Vertical stack
- Video feed reduced height
- Single column everything
- Simplified chart (fewer data points visible)