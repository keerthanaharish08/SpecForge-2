---
name: Academic Editorial System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#49607c'
  primary: '#001428'
  on-primary: '#ffffff'
  primary-container: '#0f2942'
  on-primary-container: '#7991af'
  inverse-primary: '#b0c9e8'
  secondary: '#4059aa'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1d3989'
  tertiary: '#051325'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a283a'
  on-tertiary-container: '#818fa5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b0c9e8'
  on-primary-fixed: '#011d35'
  on-primary-fixed-variant: '#314863'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#264191'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  code-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system targets higher education faculty, curriculum chairs, department heads, and accreditation reviewers. The operational posture is academic, methodical, quiet, and rigorous. It strips away cosmetic distractions to prioritize long-form administrative document authoring, matrix verification, and institutional workflow compliance.

The design movement combines **Minimalism** with **Modern Enterprise Tooling** (derived from the mechanical clarity of Linear and the document focus of Notion). Visual hierarchy is driven by crisp structural keylines, disciplined spacing, and high-legibility typography rather than heavy decorative treatments or illustrative artifacts. The resulting interface feels authoritative, focused, and unhurried.

## Colors

The system employs a strict light-mode operational palette designed for long hours of intense drafting and audit tasks.

### Core Architecture
- **Canvas Base:** `#F8FAFC` provides a muted, low-glare ground for sustained viewing.
- **Surface Panels:** `#FFFFFF` pure white cards, inspector sidebars, and paper sheets.
- **Structural Borders:** `#E2E8F0` defines structural boundaries, grid cells, and pane dividers without visual noise. Muted separators use `#F1F5F9`.
- **Primary Text:** `#0F172A` provides optimal contrast against white and light neutral surfaces.
- **Muted Text:** `#64748B` for secondary labels, metadata, and structural microcopy.

### Brand Accents
- **Primary Accent (`#0F2942`):** Academic Deep Navy for primary actions, current navigation milestones, active selection states, and focus anchors.
- **Secondary Accent (`#1E3A8A`):** Interactive cobalt blue for text links, focused radio tokens, and hovering interactive controls.

### Semantic Status Tokens
- **Success / Passed:** `#15803D` text on `#DCFCE7` background (border: `#BBF7D0`). Used for completed validations, fully mapped outcomes, and approved workflow nodes.
- **Warning / Pending:** `#B45309` text on `#FEF3C7` background (border: `#FDE68A`). Used for unmapped credits, incomplete elective baskets, and reviewer suggestions.
- **Critical / Error:** `#B91C1C` text on `#FEE2E2` background (border: `#FECACA`). Used for credit overload violations, circular prerequisites, and rejected items.
- **Neutral / Draft:** `#475569` text on `#F1F5F9` background (border: `#E2E8F0`). Used for archival metadata, read-only markers, and uncommitted changes.

## Typography

The typographic hierarchy pairs **Inter** for all prose, structural headers, and interface labels with **JetBrains Mono** for course identification codes (e.g., `CS-302`, `MATH-104`), credit allocations (`3:1:0`), Bloom’s Taxonomy levels, and outcome correlation vectors.

### Typesetting Rules
- **Course Identifiers & Matrix Data:** All outcome tags, credit breakdowns, and matrix inputs must use `code-sm` or `code-md` to maintain tabular vertical alignment.
- **Editorial Legibility:** Body prose within course descriptions and outcome definitions must maintain a line height of at least 1.55x the font size (`body-md` / `body-lg`) to ensure long-form scanning comfort.
- **Numeric Figures:** All numeric rendering in tables and credit tallies must activate font features `tnum` (tabular figures) and `cv05` for unambiguous character distinction.

## Layout & Spacing

The layout is built for complex, screen-dense desktop workflows starting at 1366px wide, with standard deployment targets at 1440px and 1920px. 

### Screen Grid & Architecture
- **Global Header:** Persistent 56px height, containing brand signature, academic catalog selector, live role toggle (`Author`, `Reviewer`, `HOD`), validation status pill, and export actions.
- **Workflow Navigation (Left Rail):** 240px wide, expandable to 280px. Sequential stage tracking: *Upload Spec* → *Course Details* → *CO-PO Mapping* → *Credit Audit* → *Approval Routing* → *Export*.
- **Primary Workspace (Center Canvas):** Fluid container constrained to max-width 1080px for standard document sheets, or 100% fluid for dense matrix editors. Background uses the muted `#F8FAFC` canvas, with the active paper sheet centered on `#FFFFFF`.
- **Inspector / Validation Drawer (Right Rail):** 320px contextual panel, toggleable, showing live accreditation errors, Bloom's level distributions, and revision threads.

### Breakpoints & Adaptations
- **Desktop Large (≥1440px):** Three-column visible view (Nav Rail + Document Canvas + Validation Inspector).
- **Desktop Standard (1280px - 1439px):** Validation Inspector collapses into an overlay drawer; Nav Rail contracts to 64px icon-only state if screen width falls below 1366px.
- **Tablet / Laptop Compact (<1280px):** Navigation rail becomes a slide-out drawer; matrix views switch to sticky header/row scrolling with locked coordinate labels.

## Elevation & Depth

Visual hierarchy in this design system avoids heavy shadows, gradients, and blurred depth maps. Depth is conveyed strictly through **tonal layering** and **crisp 1px borders**.

### Layering Hierarchy
1. **Canvas (`#F8FAFC`):** Lowest background surface.
2. **Surface Panel (`#FFFFFF`):** Work surfaces, document pages, card containers, and fixed sidebars. Surrounded by a 1px solid border of `#E2E8F0`.
3. **Elevated Overlays & Menus:** Dropdowns, popovers, and quick-search command palettes use `#FFFFFF`, a 1px border of `#CBD5E1`, and a clinical ambient shadow:
   - `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)`
4. **Modal Dialogs (Workflow Approvals):** `#FFFFFF` surface with a slightly deeper drop:
   - `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`
   - Scrim backdrop: `rgba(15, 41, 66, 0.25)` with no blur.

## Shapes

The design system enforces a soft, highly disciplined geometry (`roundedness: 1`). Radii stay tight and compact to maximize data density and reinforce architectural structure.

### Radius Assignments
- **Base (0.25rem / 4px):** Form inputs, numeric cells, matrix chips, audit list items, and standard action buttons.
- **Large (0.5rem / 8px):** Document cards, paper containers, modal dialogs, and popover panels.
- **Full Pill (`9999px`):** Status badges, role selector switchers, and Bloom level tags.

## Components

### Buttons
- **Primary:** Background `#0F2942`, text `#FFFFFF`, border `1px solid #0F2942`. Hover state: `#1E3A8A`. Focus state: 2px offset with ring `#1E3A8A`. Padding: 8px 14px; typography: `body-md` (weight 500); radius: 4px.
- **Secondary / Outline:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #CBD5E1`. Hover state: `#F8FAFC` background with `#0F172A` border.
- **Ghost / Table Action:** Background transparent, text `#475569`. Hover: background `#F1F5F9`, text `#0F172A`.

### Status Badges & Document Chips
- **Semantic Pills:** Height 22px, border-radius `9999px`, horizontal padding 8px, font: `code-xs`.
  - *Compliant:* Background `#DCFCE7`, text `#15803D`, border `1px solid #BBF7D0`.
  - *Warning / Incomplete:* Background `#FEF3C7`, text `#B45309`, border `1px solid #FDE68A`.
  - *Missing / Error:* Background `#FEE2E2`, text `#B91C1C`, border `1px solid #FECACA`.
  - *Draft:* Background `#F1F5F9`, text `#475569`, border `1px solid #E2E8F0`.

### Form Fields & Editable Cells
- **Text Inputs:** Height 34px, background `#FFFFFF`, border `1px solid #CBD5E1`, radius 4px, font `body-md`. Focus ring: `0 0 0 1px #0F2942`.
- **Inline Table Cells:** Borderless by default, showing 1px dashed `#CBD5E1` on hover. On click, converts to an active cell input with a 1px solid `#0F2942` bounding border.

### CO-PO-PSO Data Matrix Table
- **Header Cells:** Background `#F8FAFC`, height 36px, font `code-sm`, border-bottom `1px solid #CBD5E1`, text `#475569`. Column lines: `1px solid #F1F5F9`.
- **Correlation Value Cells (0, 1, 2, 3 or “-“):** Width 44px, height 36px, center-aligned, font `code-md`.
  - Hover: cell tint `#F1F5F9`.
  - Active: `#0F2942` text with `#E2E8F0` background and clear focus outline.

### Navigation Stepper (Left Rail)
- **Item Container:** Height 36px, radius 4px, horizontal padding 10px, display flex, align items center.
- **State Inactive:** Text `#64748B`, font `body-md`.
- **State Active:** Background `#F1F5F9`, text `#0F2942`, font `body-md` (weight 600), left indicator bar 3px solid `#0F2942`.
- **Stage Counter:** Width 18px, height 18px, font `code-xs`, circular badge displaying step number or checkmark icon.

### Role Selector Segmented Control
- Outer container: height 32px, background `#F1F5F9`, border `1px solid #E2E8F0`, radius 6px, padding 2px.
- Segment button: font `label-md`, radius 4px, padding 4px 10px. Active segment: background `#FFFFFF`, text `#0F2942`, shadow `0 1px 2px rgba(15, 23, 42, 0.08)`.