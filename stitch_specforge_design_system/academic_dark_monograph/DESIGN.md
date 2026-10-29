---
name: Academic Dark Monograph
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#8083ff'
  on-tertiary-container: '#0d0096'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates rigorous academic publishing and technical specification review into an uncompromising dark interface. Built for deep focus, long-form peer review, and structural inspection, the visual language balances the intellectual gravitas of archival editorial typography with the density and precision of specialized developer tooling.

The aesthetic fuses **Modern Editorial Authority** with **High-Density Technical Minimalism**:
- **Tone:** Authoritative, disciplined, scholarly, and surgically precise.
- **Visual Discipline:** Zero decorative gradients, zero illustrative blur, and zero ornamental physics. Visual interest originates entirely from strict typographic hierarchy, deliberate negative space, and meticulous hairline structural rules.
- **Scannability:** Information layers are structured for immediate ocular triage—status flags, citation-grade metadata, and diff verifications stand out clearly against near-black ground surfaces.

## Colors

The palette establishes an ultra-deep tonal foundation that prevents eye fatigue across prolonged review cycles while maintaining AAA contrast ratings for textual verification.

### Surface Architecture
- **Canvas Base (`#0b0f17`):** Deep black void ground for root viewports and non-interactive workspaces.
- **Surface Elevated (`#111827`):** Primary structural surface for editorial panels, inspection sidebars, and paper sheets.
- **Surface Raised / Interactive (`#1a2234`):** Secondary container surface for data tables, card groupings, and hover states.

### Editorial & Text Hierarchy
- **Text High Contrast (`#ffffff`):** Reserved for primary headings, body prose in active reading mode, and critical data values.
- **Text Muted / Scholarly Annotation (`#94a3b8`):** Applied to metadata, abstract headers, line numbering, and secondary notation.
- **Text Subdued (`#64748b`):** Footnotes, inactive iconography, and disabled indices.

### Delimiters & Structural Hairlines
- **Border Default (`#1f2937`):** Hairline separator between content panes and standard layout panels.
- **Border Active / Contrast (`#374151`):** Active selections, table heads, input outlines, and high-emphasis bounds.

### Semantic Triage Accents
- **Academic Focus (`#3b82f6`):** Primary anchor for active citations, focused tabs, selected tree nodes, and key action calls.
- **Secondary Index (`#06b6d4`):** Telemetry accents, code token identifiers, and spec version stamps.
- **Tertiary Cross-Reference (`#6366f1`):** Scholarly cross-linking, peer reviews, and taxonomy tags.
- **Pass / Validated (`#10b981`):** Emerald green indicator for verified assertions, passing test specs, and approved reviews.
- **Cautionary / Pending (`#f59e0b`):** Amber tone for pending approvals, deprecation warnings, and spec ambiguities.
- **Critical / Rejected (`#f43f5e`):** Rose red tone for specification errors, failed schemas, and rejection notices.

## Typography

Typography functions as the primary visual architecture of this design system. It brings together three distinct typographic engines:

1. **Newsreader (Editorial & Headlines):** Imparts authoritative publication quality to specification titles, paper headers, thesis statements, and section intros. Used primarily in normal or medium weights to prevent heavy ink traps on dark backgrounds.
2. **Inter (System & Body Copy):** Provides hyper-legible, neutral reading metrics for continuous documentation, peer review annotations, and multi-paragraph specification prose.
3. **JetBrains Mono (Technical Notation, Labels, & Status Tokens):** Handles code blocks, schema declarations, metadata indices, diff statuses, and citation hashes.

### Rules of Application
- Major publication titles must use italic styles of **Newsreader** sparingly and strictly for Latin citations, volume titles, and formal publication names.
- Specification versioning and system statuses (`APPROVED`, `REV-2024.11`, `RFC-09`) must strictly use uppercase **JetBrains Mono** with the designated tracking to maximize distinct optical rhythm against body text.

## Layout & Spacing

The layout is built upon a deterministic **Asymmetric Editorial Grid** inspired by scholarly publications and double-column research journals.

### Layout Mechanics
- **Desktop (≥ 1280px):** A 12-column split configuration.
  - Columns 1–3 (Navigational outline, spec hierarchy, index tree).
  - Columns 4–9 (Central manuscript sheet, max-width `740px` for optimal body measure of 65–75 characters per line).
  - Columns 10–12 (Marginalia, inspector panel, cross-references, annotations).
- **Tablet (768px – 1279px):** An 8-column layout. Marginalia shifts into collapsible inline drawers; navigation tucks into a fixed-width slide-out drawer.
- **Mobile (< 768px):** A single-column document flow with fixed 1rem margins. Sidebars collapse to anchored bottom sheets.

### Spacing Discipline
Spacing relies on a strict 4px/8px modular rhythm. Component padding must be tightly constrained to maintain information density, while document section breaks leverage `space-xl` (`2.5rem`) to delineate major article divisions cleanly without heavy graphic dividers.

## Elevation & Depth

This design system avoids all diffuse, atmospheric drop-shadows and blurred glass surfaces. Depth is established exclusively through **Tonal Stacking** and **Hairline Outlines**.

### Surface Elevation Hierarchy
- **Base Level (Canvas):** `#0b0f17` (Deepest darkness, grounding the entire interface).
- **Container Level 1 (Panels, Nav Rails, Manuscript Sheets):** `#111827`, demarcated with a continuous 1px solid outline of `#1f2937`.
- **Container Level 2 (Sub-cards, Metadata Boxes, Code Blocks):** `#1a2234`, bounded by `#1f2937` or `#374151` on hover.
- **Flyouts & Modals:** Retain the `#111827` surface fill with an amplified border of `1px solid #374151` paired with a crisp, non-blurred perimeter shadow: `0 0 0 1px #374151, 0 8px 16px -4px rgba(0, 0, 0, 0.8)`.

By completely eschewing color gradients and soft ambient halos, the UI produces high visual clarity suited for exacting technical and scholarly inspection.

## Shapes

The design system maintains a **Soft-Chiseled (Level 1)** geometric standard. Roundedness is intentionally restrained (`0.25rem` / `4px`) to preserve the structure of physical journals and technical instrument panels.

- **Standard Inputs, Badges, Buttons, and Cards:** `0.25rem` (`4px`).
- **Panels, Sheet Containers, and Modal Dialogs:** `rounded-lg` (`0.5rem` / `8px`).
- **Circular Elements:** Strictly reserved for round state indicators and user avatar initials (`rounded-full`). Never use pill shapes for operational buttons or editorial tags.

## Components

### Buttons
- **Primary:** Surface `#3b82f6`, text `#ffffff`, border `1px solid transparent`, radius `4px`. On hover: `#2563eb`. Focused: crisp focus ring offset by `2px` using `#0b0f17`.
- **Editorial / Secondary:** Surface `#1a2234`, text `#ffffff`, border `1px solid #374151`, radius `4px`. On hover: surface `#243048`, border `#4b5563`.
- **Ghost / Marginalia Action:** Background transparent, text `#94a3b8`, border `1px solid transparent`. On hover: text `#ffffff`, surface `#111827`, border `1px solid #1f2937`.

### Chips & Semantic Badges
- Built exclusively with `JetBrains Mono` at `label-md` or `label-sm`.
- **Verified / Pass:** Border `1px solid #059669`, background `#064e3b` at 30% opacity, text `#34d399`.
- **Warning / Ambiguity:** Border `1px solid #d97706`, background `#78350f` at 30% opacity, text `#fbbf24`.
- **Error / Rejected:** Border `1px solid #e11d48`, background `#881337` at 30% opacity, text `#fb7185`.
- **Metadata / Tag:** Border `1px solid #1f2937`, background `#111827`, text `#94a3b8`.

### Input Fields & Search Queries
- Surface `#0b0f17`, border `1px solid #1f2937`, radius `4px`, typography `Inter` `body-md` in `#ffffff`.
- Placeholder text in `#64748b`.
- Focused state: border color switches sharply to `#3b82f6` with a `0 0 0 1px #3b82f6` inset rule. No external diffused glow.

### Checkboxes & Radios
- Size: `16px x 16px`, radius `2px` (checkbox) or `50%` (radio).
- Unchecked: surface `#0b0f17`, border `1px solid #374151`.
- Checked: surface `#3b82f6`, border `1px solid #3b82f6`, tick/dot icon `#ffffff`.

### Cards & Editorial Panes
- Background `#111827`, border `1px solid #1f2937`, padding `1.25rem`.
- Divided internal sections use border-bottom `1px solid #1f2937`.

### Academic Document Marginalia & Review Callouts
- **Margin Notes / Comments:** Fixed to right column, linked by superscript citation tags. Border-left `2px solid #3b82f6`, padding-left `0.75rem`, surface transparent, text `body-sm` `#94a3b8`.
- **Specification Diff Row:** Monospaced table row. Added tokens display with `#10b981` text over a subtle `rgba(16, 185, 129, 0.08)` ground; deleted tokens display `#f43f5e` text over `rgba(244, 63, 94, 0.08)`.