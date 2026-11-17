# FlowDesk — SaaS Landing Page

A clean, responsive landing page for **FlowDesk**, an AI-powered project management SaaS product.

## 🚀 Live Demo

Open `index.html` in any modern browser to view the page locally.

## 📁 Project Structure

```
flowdesk-landing/
├── index.html          # Main HTML page
├── css/
│   └── styles.css      # Complete stylesheet with responsive design
├── js/
│   └── main.js         # Interactions, validation, animations
├── assets/             # (placeholder for images/assets)
└── README.md           # This file
```

## 🛠 Technologies Used

| Technology       | Purpose                                       |
|------------------|-----------------------------------------------|
| **HTML5**        | Semantic page structure                       |
| **CSS3**         | Styling, layout (Flexbox & Grid), animations  |
| **JavaScript**   | DOM interactions, form validation, scroll FX   |
| **Google Fonts** | Inter typeface (loaded via CDN)               |
| **Feather Icons**| Lightweight SVG icon set (loaded via CDN)     |

No frameworks (React, Bootstrap, etc.) are used — the entire page is built with vanilla HTML, CSS, and JS.

## 📋 Sections Included

1. **Navigation Bar** — Fixed top nav with logo, links, and CTA button; hamburger menu on mobile.
2. **Hero Section** — Product headline, description, dual CTAs, social proof avatars, and an animated dashboard mockup.
3. **Features** — Six feature cards with icons, titles, and descriptions in a responsive grid.
4. **How It Works** — Three-step onboarding flow with illustrations and connectors.
5. **Pricing** — Three plans (Starter / Professional / Enterprise) with a monthly/yearly toggle and animated price transitions.
6. **Testimonials** — Three customer testimonial cards (bonus section).
7. **Contact / Demo Request** — Contact info + a form with real-time validation and a success message.
8. **Footer** — Brand description, navigation links, social icons, and copyright.

## ⚡ Key Interactions

- **Smooth scrolling** — All anchor links scroll smoothly to their target section.
- **Mobile hamburger menu** — Toggles a full-screen mobile navigation overlay.
- **Active nav link highlighting** — The current section's nav link is highlighted on scroll.
- **Pricing toggle** — Switch between monthly and yearly pricing with animated counter transitions.
- **Form validation** — Real-time validation on blur and submit with inline error messages.
- **Success message** — Displays a confirmation message after valid form submission (no backend).
- **Scroll reveal** — Feature cards, pricing cards, and testimonials fade in as they enter the viewport.
- **Back-to-top button** — Appears after scrolling down and smoothly scrolls to the top.
- **Hover effects** — Cards lift and gain shadow on hover; buttons have subtle transform effects.

## 📱 Responsive Breakpoints

| Breakpoint      | Layout Adjustments                                 |
|-----------------|----------------------------------------------------|
| **> 1024px**    | Full desktop layout (3-column grids, side-by-side) |
| **768–1024px**  | Tablet layout (2-column grids, stacked hero)       |
| **< 768px**     | Mobile layout (1-column, hamburger nav, stacked)   |
| **< 480px**     | Small mobile (adjusted typography, stacked stats)  |

## 🎨 Design Choices & Challenges

The design follows a **modern SaaS aesthetic** with a purple primary palette (violet/indigo family) chosen for its association with creativity and technology. **Inter** was selected as the typeface for its excellent readability across screen sizes. The page uses a strict spacing scale and consistent border-radius values via CSS custom properties to maintain visual harmony. The dashboard mockup in the hero section was built entirely with CSS to avoid dependency on external images while still communicating the product's interface. The main challenge was implementing the pricing toggle with animated counters that feel smooth — this was solved using `requestAnimationFrame` with an ease-out cubic curve. Form validation handles both blur-time and submit-time checks, clearing errors in real time as the user corrects their input.

## 🏃 How to Run Locally

1. Clone or download this repository.
2. Open `index.html` in a web browser (Chrome, Firefox, Safari, Edge).
3. No build step, server, or dependencies required.

> **Note:** An internet connection is needed on first load to fetch Google Fonts and Feather Icons from their CDNs.

## 📸 Screenshots

Screenshots showing desktop and mobile layouts are included in the submission.

## 📄 License

This project is for educational / internship assignment purposes.
