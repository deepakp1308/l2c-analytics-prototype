# L2C Prototype — Full Project Context

> Use this file to resume work on this prototype in a new Claude session.
> Paste this file or reference it at the start of a new conversation.

---

## 1. What This Is

A **QuickBooks Online (QBO) prototype** demonstrating 9 Lead-to-Cash (L2C) analytics use cases for "Santos Design & Build" (a home renovation contractor). It's built as an authentic QBO SaaS product — NOT a storyboard walkthrough. The 9 scenes are embedded organically across 3 QBO pages using real QBO left navigation and Intuit Assist branding.

**Source storyboard**: `L2C_Customer_Storyboard_v3.docx`

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | v4 (`@import "tailwindcss"` syntax) |
| CSS | CSS custom properties (`--qbo-*`) | — |
| Language | TypeScript | 5.x |
| Bundler | Turbopack (default in Next 16) | — |

**Project path**: `/Users/dprabhakara/ai_workspace/l2c-prototype/`

**Dev server**: `npm run dev` → `http://localhost:3000`

**Preview server config** (`.claude/launch.json`): name = `l2c-dev`

---

## 3. Design System — QBO Tokens

All defined in `src/app/globals.css` as `:root` CSS custom properties:

| Token | Hex | Use |
|-------|-----|-----|
| `--qbo-green` | `#2CA01C` | QBO primary green, buttons, positive |
| `--qbo-blue` | `#0077C5` | Links, info badges |
| `--qbo-red` | `#D13B3B` | Errors, danger, overdue |
| `--qbo-orange` | `#E87040` | Warnings |
| `--qbo-purple` | `#6C5CE7` | Intuit Assist accent |
| `--qbo-sidebar` | `#1B2533` | Dark sidebar bg |
| `--qbo-bg` | `#F5F5F5` | Page background |
| `--qbo-text-primary` | `#212B36` | Headings |
| `--qbo-text-secondary` | `#6B7280` | Labels |
| `--qbo-text-muted` | `#9CA3AF` | Captions |
| `--qbo-border` | `#E5E7EB` | Card/table borders |
| `--intuit-assist-from` | `#6C5CE7` | Purple gradient start |
| `--intuit-assist-to` | `#A855F7` | Purple gradient end |

**Font**: Avenir Next, -apple-system, Helvetica Neue, Arial

### Intuit Assist Branding
- Purple gradient sparkle icon (8-pointed star SVG)
- `intuit-assist-gradient` CSS class for backgrounds
- `intuit-assist-text` CSS class for gradient text
- `assist-glow` CSS class for subtle glow animation

---

## 4. Architecture & File Map

### Layout (`src/app/layout.tsx`)
- Root layout: `<QBOSidebar />` + `<QBOTopBar />` + `<main>{children}</main>`
- Sidebar is 56px collapsed, 200px on hover
- TopBar is 52px fixed header with company name, search, + New, Intuit Assist button, settings, avatar "MS"
- Main area scrolls with `overflow-y-auto`, has `pb-14` for bottom scene tabs

### Pages (3 pages, 9 scenes total)

#### `/` — Dashboard (`src/app/page.tsx`)
In-page tabs: Campaign ROI | Ad Attribution | Lead Funnel | L2C Intelligence
- **Scene 1** — `Scene1_CampaignROI`: Revenue per $1 by channel, response time vs conversion, campaign table, AI insight cards
- **Scene 2** — `Scene2_Attribution`: Ad-to-cash attribution funnel (horizontal), ROAS comparison, deal size by channel
- **Scene 3** — `Scene3_LeadFunnel`: Funnel chart (New→Won), stale leads table, leak doctor AI card
- **Scene 9** — `Scene9_L2CFunnel`: End-to-end L2C funnel, customer profile (The Andersons), churn risk line chart, weekly report builder

#### `/sales` — Sales (`src/app/sales/page.tsx`)
In-page tabs: Pipeline | Proposals | Contract → Cash
- **Scene 4** — `Scene4_Pipeline`: Pipeline bar chart, win/loss donut, deals table, meeting format comparison
- **Scene 5** — `Scene5_Proposals`: Template sign rate, days to sign by send day, active proposals table
- **Scene 6** — `Scene6_ContractToCash`: Contract pipeline progress bars, post-signature deals table, cycle time breakdown

#### `/cashflow` — Cash Flow (`src/app/cashflow/page.tsx`)
In-page tabs: Project Margins | Payments & Waterfall
- **Scene 7** — `Scene7_Profitability`: Project health grid (4 projects), Davis budget alert with cost breakdown
- **Scene 8** — `Scene8_Payments`: DSO trend line, payment method speed, overdue receivables table, revenue waterfall

### Scene Navigation
- `SceneTabs` component: fixed bottom bar showing all 9 scenes grouped by page
- Cross-page navigation: `router.push(scene.page + "?scene=" + scene.id)`
- In-page navigation: sub-tabs within each page
- `useSearchParams` reads `?scene=N` query param

### Components (`src/components/`)

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `QBOSidebar.tsx` | Dark collapsible sidebar | Primary nav: Dashboard, Sales, Cash flow; Secondary: Invoicing, Expenses, etc. |
| `QBOTopBar.tsx` | Header bar | Company name, search, + New, Intuit Assist, settings, avatar |
| `SceneTabs.tsx` | Bottom demo nav | 9 scenes grouped by page |
| `IntuitAssistCard.tsx` | AI insight card | title, message (whitespace-pre-line), actions[] |
| `MetricCard.tsx` | KPI card | label, value, change, changeType, subtitle |
| `BarChart.tsx` | Vertical bar chart | data[]{label, value, color?}, height, barColor |
| `DonutChart.tsx` | SVG donut chart | segments[]{label, value, color}, centerLabel, centerValue |
| `LineChart.tsx` | SVG line chart | data[]{label, value}, color, height, yLabel |
| `FunnelChart.tsx` | Horizontal funnel | stages[]{label, value, color, conversion?} |
| `DataTable.tsx` | Simple table | headers[], rows[][] |
| `StatusBadge.tsx` | Colored pill badge | status, variant (success/warning/danger/info/default) |
| `ProgressBar.tsx` | Horizontal bar | value, max, color, label, showValue |
| `AIAgentCard.tsx` | (Legacy, unused) | Replaced by IntuitAssistCard |
| `Sidebar.tsx` | (Legacy, unused) | Replaced by QBOSidebar |
| `SceneHeader.tsx` | (Legacy, unused) | Replaced by in-page headers |

---

## 5. Critical Bugs Fixed (History)

### Chart Colors Not Rendering (FIXED)
**Root cause**: CSS custom property strings like `"var(--qbo-blue)"` were passed as color data to chart components. These don't resolve properly in:
- SVG `stroke` attributes (SVG presentation attributes don't resolve CSS variables)
- Inline `style={{ backgroundColor }}` (unreliable in some cases)

**Fix applied**: Replaced ALL `var(--qbo-*)` color strings in chart data with actual hex values:
- `var(--qbo-blue)` → `#0077C5`
- `var(--qbo-green)` → `#2CA01C`
- `var(--qbo-orange)` → `#E87040`
- `var(--qbo-red)` → `#D13B3B`
- `var(--qbo-purple)` → `#6C5CE7`

Also fixed DonutChart: changed `stroke={seg.color}` to `style={{ stroke: seg.color }}` so SVG uses CSS-resolvable inline styles.

Also fixed chart component defaults: `BarChart` default → `"#2CA01C"`, `LineChart` default → `"#2CA01C"`.

### CSS Animation Collapsing Bars (FIXED)
**Root cause**: `bar-animate` CSS class used `scaleY(0)→scaleY(1)` animation. With Tailwind v4, `animation-fill-mode: forwards` wasn't applying properly, leaving bars at scale 0.

**Fix**: Removed all CSS animations from chart components. Bars now use plain `style={{ height: barH }}`.

### Wrong CSS Variable Names (FIXED)
**Root cause**: Components referenced old `--qb-dark`, `--qb-gray`, `--qb-green` names, but globals define `--qbo-*` names.

**Fix**: Updated all references to use `--qbo-*` naming convention.

### LineChart SVG Distortion (FIXED)
**Root cause**: Used `preserveAspectRatio="none"` with `viewBox="0 0 100 160"`.

**Fix**: Rewrote with `viewBox="0 0 400 {height}"` and `width="100%"`.

---

## 6. Important Rules

1. **CSS vars in Tailwind classes** (`text-[var(--qbo-green)]`, `bg-[var(--qbo-border)]`) — these DO work fine for Tailwind arbitrary values in class names.
2. **CSS vars as data/prop values** passed to components (chart colors, progress bar colors) — use **hex values only**, not CSS var strings.
3. **SVG attributes** (`stroke`, `fill`) — never use CSS custom property strings. Either use `style={{}}` or hex values.
4. **Tailwind v4** — uses `@import "tailwindcss"` not `@tailwind base/components/utilities`.
5. **Next.js 16** — all client components need `"use client"` directive. App Router with file-system routing.
6. **Intuit Assist** — all AI content uses the IntuitAssistCard component with purple gradient branding. Never use generic "AI" labeling.
7. **Company persona** — "Santos Design & Build" (Mike Santos, home renovation contractor). Avatar: "MS".

---

## 7. What's Working (Current State)

- All 3 pages render correctly with QBO styling
- Sidebar navigation works (Dashboard, Sales, Cash flow)
- All 9 scenes accessible via in-page tabs and bottom scene tabs
- All chart types render with visible colors:
  - Bar charts (vertical, colored bars with labels and values)
  - Donut charts (SVG with rotation-based segments)
  - Line charts (SVG polyline with area fill and dots)
  - Funnel charts (horizontal bars with conversion percentages)
- Intuit Assist cards show purple gradient branding
- Metric cards, data tables, status badges, progress bars all working
- Cross-page scene navigation via query params

---

## 8. Potential Next Steps / Improvements

- Add interactivity (click handlers on buttons, modal dialogs)
- Add transitions/animations between scene switches
- Responsive design for tablet/mobile
- Make the Intuit Assist chat panel (split panel with Smart Space)
- Add more realistic data or data generation
- Deploy to Netlify for demo sharing
- Polish: hover states, tooltips on charts, skeleton loading states
