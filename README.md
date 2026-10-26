# Bear Bloom Home Monitor

PROJECT CONTEXT (applies to every prompt in this project)

What we're building: a premium single-page product landing page for "Bear Mini-Mum", a concept smart baby monitor for the US market. This is a product design assessment, so the page must look like a real, launch-ready premium brand site.

The product: a small (11 cm) baby monitor shaped like a minimalist seated teddy bear, in matte light beige with a cocoa-brown camera visor. It is designed for ages 0–3: overhead breathing and safety alerts for newborns, cry/wake/climb alerts for 1–2 year olds, and for 2–3 year olds it turns 360° to follow them and lets them squeeze its ears to "send a hug" to a parent. AI runs on the device, video stays at home by default, and every safety alert is free for life with no subscription. One device, one phone app, magnetic mounts (cot Arc, wall plate, shelf, floor stand).

Audience: anxious, sleep-deprived new parents, plus grandparents and babysitters. They want reassurance, privacy and simplicity, and they're tired of false alarms and subscriptions.

Story the page tells, top to bottom: the 3am worry → "Bear minimum design. Maximum care." → what it does (night vision, trusted alerts, privacy, no paywall) → day and night → inside the bear → it grows with your child (0–3) → the app → set up in minutes → accessories → real-life moments → comparison → privacy proof → pricing → guarantees → FAQ.

Brand feel: calm, warm, premium and minimal, like a high-end Scandinavian home brand. References: Tolva (product stage hero, pinned scroll stories, mono labels), Essentia (pinned product with feature blocks, word-by-word reveals, sticky purchase bar), KinderHeaven (warm cream palette, soft rounded cards, auto-advancing feature list).

Rules for every prompt:
- Colours only from the tokens: cream #F7F3EC, linen #E3D6C3, sand #CDBFA9, card #FFFDF9, ink #2B211B, muted #7A6D62, cocoa #5B4739, midnight #1C1A22, glow #F3D9AE.
- Fonts: Geist and Geist Mono only. No drop shadows; hairlines instead of borders.
- Motion is slow and smooth (easing cubic-bezier(.16,1,.3,1)), never bouncy, and always respects prefers-reduced-motion.
- Use the copy I give exactly; don't invent text, statistics, reviews or testimonials.
- Never show a baby in a cot with pillows, toys or loose blankets, and never place the monitor inside the cot.
- Use the image and video files I attach with their exact file names, saved in public/assets/.
- Mobile-first quality: every section must work beautifully at 390px wide.
- Build only what each prompt asks for; keep everything already built unless told to change it.

Prompt 1 · Design system and page skeleton
Attach: logo-horizontal-cocoa.svg, mark-cocoa.svg, app-icon.png
Build a premium single-page product landing page for "Bear Mini-Mum", a small bear-shaped smart baby monitor for ages 0–3, sold in the US. In this first step, set up the design system, global layout and an empty section skeleton only. Save the attached files in public/assets/ with their exact names; use app-icon.png as the favicon.

Tech: React, TypeScript, Tailwind. Install framer-motion for animation and lenis for smooth scrolling. Respect prefers-reduced-motion everywhere: when set, show final states with no animation.

DESIGN TOKENS (add to tailwind.config and CSS variables):
- cream #F7F3EC (page background)
- linen #E3D6C3 (product stage, product colour)
- sand #CDBFA9 (secondary surfaces)
- card #FFFDF9 (cards)
- ink #2B211B (headings and text)
- muted #7A6D62 (body text, captions)
- cocoa #5B4739 (buttons, accents, logo)
- midnight #1C1A22 (night sections)
- glow #F3D9AE (night accents only)
- hairline rgba(43,33,27,0.10)

TYPE: Geist for everything (weights 400, 500, 600) and Geist Mono for small uppercase labels, both from Google Fonts. Headings weight 500–550 with tight tracking (-0.035em). Scale: display 96px, section 56px, card titles 28px, lead 21px, body 16px, labels 12px mono uppercase with +0.08em tracking. On mobile: display 44px, section 34px.

SHAPE: pill buttons (radius 999px), cards radius 24px, images radius 28px, no drop shadows anywhere, 1px hairlines instead of borders, frosted glass (white at 60% with 14px backdrop blur) only on floating controls. Max content width 1320px, side padding 40px desktop and 20px mobile, section padding 160px desktop and 88px mobile.

MOTION: default easing cubic-bezier(.16,1,.3,1). Reveals fade in and rise 40px, tied to scroll position. UI transitions 0.5–0.7s. Nothing bounces.

COMPONENTS to create:
- Button: primary (cocoa background, cream text) and secondary (transparent, cocoa text, 1px hairline). 48px tall, 15px weight-550 text with an arrow "→". Hover: the label rolls up and an identical copy rolls in from below (0.45s).
- Eyebrow label: Geist Mono, 12px, uppercase, muted, with an optional number like "01 ·".
- SectionHeading: eyebrow, heading, optional lead paragraph.
- Reveal wrapper: fades and rises children as they scroll into view, with an optional stagger.

NAV: a floating frosted pill, 16px from the top, centred, max 1080px wide, 60px tall. Left: the logo (logo-horizontal-cocoa.svg, 28px tall). Centre links: How it works, Ages, App, Compare, Pricing, FAQ (smooth-scroll to sections). Right: primary button "Order · $229". When the page scrolls more than 80px, the pill shrinks to 860px wide. Mobile: logo, then a round cocoa menu button opening a full-screen cream panel with large links and the order button.

SKELETON: create empty, correctly ordered sections with these ids so later prompts can fill them: hero, statement, features, daynight, inside, ages, app, setup, accessories, lifestyle, compare, privacy, pricing, covered, faq, footer. Give each a temporary label so I can see the order.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bear-bloom-home-monitor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a74cc5fb-3077-4e56-bb41-648e21ad80ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
