# Ferya — Website Development Plan

**Full-Stack E-Commerce Platform with Square Integration**

Stack: Next.js + Square API + Resend + ClickUp
Target Monthly Cost: **$0**
Prepared: February 2026

---

## 1. Design Analysis

A comprehensive analysis of the Ferya website design mockup, identifying visual patterns, component structure, and design tokens to guide the implementation.

### 1.1 Brand Identity

The Ferya brand presents as a luxury bespoke event design studio specializing in custom stationery, signage, decor, and keepsakes. The visual language is refined, minimal, and elegant — targeting high-end clientele planning weddings, celebrations, and cultural events (including Islamic art and Ramadan collections).

### 1.2 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Gold | `#C4A265` | Section labels, accents, CTA buttons, checkmarks |
| Dark | `#1A1A1A` | Headings, navbar text, dark panel backgrounds |
| Body Text | `#888888` | Paragraph text, descriptions |
| Background | `#FFFFFF` / `#F5F3EF` | White and off-white cream for alternating sections |
| Heading Font | Serif (Playfair Display) | All headings, hero text, product names |
| Body Font | Sans-serif (Inter/similar) | Body copy, navigation, labels |
| Button — Primary | Dark rounded pill | Hero CTA, major actions |
| Button — Secondary | Gold rounded pill | Form submit, secondary actions |

### 1.3 Page Structure (from Navigation & Footer)

The mockup is a single-page design, but the navigation and footer links reveal the full planned page structure:

| Page | Nav Location | Purpose |
|------|-------------|---------|
| Home | Logo click | Landing page with hero, story, products, contact |
| Design (Shop) | Main nav | Product catalog — Square Catalog API integration |
| Rentals | Main nav | Rental items catalog — separate category from Square |
| Gallery | Main nav | Portfolio / photo gallery of past events |
| Our Ethos | Footer | About page — brand story, values |
| Services | Footer | Detailed service offerings |
| Process | Footer | How it works / design journey steps |
| Press | Footer | Media mentions and features |
| FAQ | Footer | Frequently asked questions |
| Policy / Privacy / Imprint | Footer | Legal pages |
| Product Detail | Product click | Individual product page with options and checkout |
| Cart / Checkout | Cart icon | Cart drawer + checkout with Square Web Payments |

### 1.4 Homepage Sections (Top to Bottom)

**Hero Section**
- Full-viewport background image (luxury wedding venue setup)
- Overlay with title "Ethereal Atmospheres", subtitle, and "BOOK YOUR DESIGN" CTA button
- Fade-in text with elegant serif/italic combination

**Our Story Section**
- Two-column layout: text left, large image right
- Section label in gold uppercase, serif heading with italic accent ("Crafting Passion into *Art*")
- Stat cards row: "100% Customization" and "Premium Materials"

**Our Expertise Section**
- Gray background, centered section header ("Elegance in Detail")
- Two service cards side by side with title, description, and gold-checkmark checklists
- Services: Custom Event Stationery and Bespoke Signage & Decor

**Curated Environments (Product Showcase)**
- Product grid: 3 cards in first row (equal width), 2 cards in second row (wider)
- Each card: product image, gold category label, product name, price ("From $XX")
- Products shown: Ramadan Mubarak Plaque ($85), Ya Allah Acrylic Charms ($45), Bespoke Place Cards ($12), Grand Seating Chart ($450), Custom Wax Seals ($25)

**Why Choose Us Section**
- Three value proposition cards with fade-in animation: Artisan Vision, Obsessive Detail, Seamless Execution

**Contact Section**
- Two-panel layout: dark panel with contact info (email, phone, location) and white panel with inquiry form
- Form fields: Full Name, Email Address, Event Date (date picker), Message / Vision (textarea)
- Gold "SEND INQUIRY" submit button

---

## 2. Component Architecture

The React component tree organized by category. All components will be built with TypeScript and styled using Tailwind CSS.

### 2.1 Layout Components (Shared Across All Pages)

| Component | Description |
|-----------|-------------|
| `Layout` | Root wrapper — renders Navbar + children + Footer on every page |
| `Navbar` | Sticky top bar: nav links (left), logo (center), search + cart icons (right), mobile hamburger |
| `Footer` | Four-column footer: brand, The Studio links, Concierge links, Follow Us social links + copyright bar |
| `CartDrawer` | Slide-in side panel showing cart items, quantities, totals, and checkout CTA |
| `SearchOverlay` | Full-screen or dropdown search modal for product search with results |
| `MobileMenu` | Mobile navigation drawer triggered by hamburger button |

### 2.2 Homepage Section Components

| Component | Description |
|-----------|-------------|
| `HeroSection` | Full-viewport hero with background image, overlay text, and CTA button |
| `StorySection` | Two-column: story text + stats on left, image on right |
| `ExpertiseSection` | Gray background section with two ServiceCard components |
| `ProductShowcase` | Product grid pulling from Square Catalog API — 3+2 card layout |
| `WhyChooseSection` | Three ValueCard components with scroll-triggered animations |
| `ContactSection` | Two-panel contact: dark info panel + white form panel |

### 2.3 Reusable Atomic Components

| Component | Description | Used In |
|-----------|-------------|---------|
| `SectionLabel` | Gold uppercase spaced text (e.g. "OUR STORY") | Every section |
| `SectionHeading` | Large serif heading, supports italic word accent | Every section |
| `CTAButton` | Dark or gold rounded pill button with hover state | Hero, products, forms |
| `ProductCard` | Image + category label + name + price | Showcase, Shop, Rentals |
| `ServiceCard` | White card with title, description, and checklist | Expertise section |
| `ChecklistItem` | Gold checkmark icon + text | ServiceCard |
| `ValueCard` | Title + description with fade-in animation | Why Choose Us |
| `StatCard` | Large number/text + gold label underneath | Story section |
| `ContactForm` | Form with text inputs, date picker, textarea, submit | Contact section |
| `IconText` | Icon + text row (email, phone, location) | Contact section |
| `FooterColumn` | Column with heading + link list | Footer |

---

## 3. Technology Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 14 (App Router) | Full-stack React framework — pages, API routes, SSR/SSG |
| Language | TypeScript | Type safety across frontend and backend |
| Styling | Tailwind CSS | Utility-first CSS matching the design tokens |
| Products | Square Catalog API | Fetch products, categories, images, pricing from Square |
| Payments | Square Web Payments SDK | Secure client-side card tokenization + Payments API |
| Customer Data | Square Customers API | Customer profiles and purchase history |
| Order Data | Square Orders API | Order creation, history, and tracking |
| Emails | Resend | Confirmation emails + contact form forwarding |
| Ticketing | ClickUp API | Auto-create tasks on order completion |
| Spam Protection | Cloudflare Turnstile | Privacy-friendly CAPTCHA on contact form |
| Hosting | Vercel (Hobby) | Frontend + serverless backend, automatic HTTPS |
| Source Control | GitHub | Git repository, PR workflow, release tags |
| Database | None (Square stores all) | Stateless architecture — no DB needed initially |

---

## 4. Feature Breakdown

### 4.1 Product Catalog (Square Integration)

- Fetch all catalog items via Square Catalog API (`GET /v2/catalog/list`)
- Display products as ProductCard grid on Design and Rentals pages
- Category filtering using Square category objects
- Product detail page with images, variants, pricing, and description
- Search functionality across products (SearchOverlay component)
- Server-side rendering for SEO — products crawlable by search engines

### 4.2 Shopping Cart

- Cart state managed via React Context (client-side)
- CartDrawer slide-in panel showing items, quantities, subtotal
- Add/remove/update quantity from product pages and cart
- Cart persisted in browser sessionStorage during visit

### 4.3 Checkout & Payments

- Square Web Payments SDK embedded on checkout page
- Supports credit/debit cards, Apple Pay, Google Pay, Cash App Pay
- Client-side card tokenization (PCI compliant — no raw card data on server)
- Server-side API route calls Square Payments API (`POST /v2/payments`)
- Order created in Square Orders API with full line-item detail
- Customer profile auto-created/linked in Square Customers API
- HTTPS required (provided free by Vercel)

### 4.4 Post-Purchase Flow

1. **Square receipt:** automatic digital receipt sent by Square (configurable in Dashboard)
2. **Confirmation email:** custom branded email sent via Resend with order details
3. **ClickUp ticket:** task created in your board with customer name, items, total, and order ID

All three happen in the same serverless function after payment confirmation.

### 4.5 Contact & Communication

- Contact form (ContactSection component) sends inquiry via Resend to your inbox
- Cloudflare Turnstile spam protection on form submission
- Square Messages available for post-purchase customer support
- Email, phone, and location info displayed in the contact panel

### 4.6 Content Pages

- Our Ethos, Services, Process, Press — static content pages
- Gallery page — image grid/masonry layout for portfolio
- FAQ page — accordion-style question/answer layout
- Policy, Privacy, Imprint — legal pages

---

## 5. Cost Breakdown

### 5.1 Monthly Operating Costs

| Service | Monthly Cost | Free Tier Limits |
|---------|-------------|-----------------|
| Vercel (Hobby) | **$0** | 100GB bandwidth, 100K function calls |
| Square API | **$0** | Unlimited API calls, no monthly fee |
| Resend | **$0** | 3,000 emails/month |
| ClickUp | **$0** | 100 API calls/minute, full API access |
| Cloudflare Turnstile | **$0** | Unlimited verifications |
| GitHub | **$0** | Unlimited public/private repos |
| **TOTAL MONTHLY** | **$0** | |

### 5.2 Per-Transaction Costs

| Payment Method | Fee |
|---------------|-----|
| Credit/Debit Cards (online) | 2.9% + $0.30 per transaction |
| ACH Bank Transfers | 1% (min $1, max $5) |
| Apple Pay / Google Pay | 2.9% + $0.30 per transaction |

### 5.3 Optional Costs

| Item | Cost |
|------|------|
| Custom domain (e.g. feryaevents.com) | ~$12–15/year |
| Vercel Pro (if traffic exceeds free tier) | $20/month |

---

## 6. Environment & Deployment Strategy

### 6.1 Git Branching Model

The deployment follows a controlled release model where `main` is the development/integration branch and production deploys only on tagged releases.

| Trigger | Vercel Env | Square | Purpose |
|---------|-----------|--------|---------|
| Push feature branch | Preview | Sandbox | Dev testing |
| Merge to main | Preview (dev) | Sandbox | Integration testing |
| Tag `v*` | Production | Production | Live site |

### 6.2 Environment Variables

| Variable | Dev / Preview | Production |
|----------|--------------|------------|
| `SQUARE_ACCESS_TOKEN` | Sandbox token | Production token |
| `SQUARE_APPLICATION_ID` | Sandbox app ID | Production app ID |
| `SQUARE_LOCATION_ID` | Sandbox location | Production location |
| `SQUARE_ENVIRONMENT` | `sandbox` | `production` |
| `RESEND_API_KEY` | Test key | Production key |
| `CLICKUP_API_TOKEN` | Test list | Production board |
| `TURNSTILE_SECRET_KEY` | Test key | Production key |

### 6.3 Deployment Workflow

1. Develop on feature branch → push → Vercel auto-deploys a preview URL with sandbox credentials.
2. Test the full purchase flow with Square sandbox fake card numbers.
3. Merge to main → dev environment updates → run integration tests against sandbox.
4. When ready, create a GitHub release (tag `v1.0.0`) → Vercel deploys to production with live credentials.
5. Roll back by re-tagging a previous version if needed.

---

## 7. Implementation Phases

### Phase 1: Foundation — Week 1–2

- Initialize Next.js project with TypeScript and Tailwind CSS
- Configure Tailwind with Ferya design tokens (colors, fonts, spacing)
- Build Layout, Navbar, Footer, MobileMenu components
- Set up GitHub repository and Vercel project with environment variables
- Configure dev (main) and production (tag) deployment branches

### Phase 2: Static Pages & Design System — Week 2–3

- Build all atomic components (SectionLabel, SectionHeading, CTAButton, etc.)
- Implement homepage sections (Hero, Story, Expertise, WhyChoose, Contact)
- Build content pages: Our Ethos, Services, Process, Press, Gallery, FAQ
- Build legal pages: Policy, Privacy, Imprint
- Responsive design across all breakpoints (mobile, tablet, desktop)

### Phase 3: Square Integration — Week 3–4

- Create Square Developer app and configure sandbox credentials
- Build API routes for Catalog API (list products, get product detail)
- Build Design (Shop) and Rentals pages with dynamic product fetching
- Build Product Detail page with image gallery, variants, pricing
- Implement SearchOverlay with product search
- Server-side rendering for SEO on product pages

### Phase 4: Cart & Checkout — Week 4–5

- Build cart state management with React Context
- Build CartDrawer component with add/remove/update functionality
- Integrate Square Web Payments SDK on checkout page
- Build server-side API route for payment processing (CreatePayment)
- Build order creation flow (Square Orders API)
- Test full purchase flow with sandbox fake card numbers

### Phase 5: Post-Purchase & Communications — Week 5–6

- Set up Resend account and email templates
- Build post-purchase serverless function (email + ClickUp ticket)
- Integrate Cloudflare Turnstile on contact form
- Build contact form API route (sends inquiry via Resend)
- Configure Square automatic receipts in Dashboard
- Enable Square Messages for post-purchase support

### Phase 6: Testing & Launch — Week 6–7

- End-to-end testing of full purchase flow in sandbox
- Test all email flows (confirmations, contact form, receipts)
- Test ClickUp ticket creation
- Performance optimization (image loading, Core Web Vitals)
- Mobile testing across devices
- Swap sandbox credentials for production
- Create first GitHub release tag (`v1.0.0`) to deploy to production
- Monitor first real transactions

---

## 8. Architecture Overview

The system follows a stateless architecture where Next.js on Vercel handles both the frontend rendering and backend API calls. All persistent data (products, customers, orders) lives in Square.

**Customer Browses Products:**
Browser → Vercel (Next.js SSR) → Square Catalog API → renders ProductCard grid

**Customer Completes Purchase:**
1. Browser loads Square Web Payments SDK → customer enters card details.
2. SDK tokenizes card client-side → sends one-time token to server.
3. Vercel API route receives token → calls Square Payments API (CreatePayment).
4. On success, same API route triggers three parallel actions:
   - **Square:** order created, customer profile linked, receipt sent
   - **Resend:** custom confirmation email sent to customer
   - **ClickUp:** task created in your board with order details

**Customer Sends Inquiry:**
Browser → Turnstile verification → Vercel API route → Resend (emails your inbox)
