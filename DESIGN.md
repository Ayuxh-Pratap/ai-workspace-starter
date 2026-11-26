---
version: alpha
name: AI Workspace
description: >-
  A calm, neutral AI chat workspace on AlignUI v1.2 (primary green, neutral gray), with a layout
  inspired by AlignUI's AI template. Tokens mirror src/app/globals.css (AlignUI) and src/styles/template.css;
  `npm run design:check` fails when they drift apart.
colors:
  # brand (AlignUI primary = green)
  primary: '#1daf61'
  primary-base: '#1daf61'
  primary-darker: '#178c4e'
  primary-dark: '#1a7544'
  primary-light: '#d6f5e8'
  primary-lighter: '#e3f7ec'
  primary-alpha-24: '#1fc16b3d'
  primary-alpha-16: '#1fc16b29'
  primary-alpha-10: '#1fc16b1a'
  # surfaces
  bg-white-0: '#ffffff'
  bg-weak-50: '#f7f7f7'
  bg-soft-200: '#ebebeb'
  bg-sub-300: '#d1d1d1'
  bg-surface-800: '#262626'
  bg-strong-950: '#171717'
  # text
  text-strong-950: '#171717'
  text-sub-600: '#5c5c5c'
  text-soft-400: '#a3a3a3'
  text-disabled-300: '#d1d1d1'
  text-white-0: '#ffffff'
  # strokes
  stroke-soft-200: '#ebebeb'
  stroke-edge: '#17171714'
  stroke-sub-300: '#d1d1d1'
  stroke-strong-950: '#171717'
  stroke-white-0: '#ffffff'
  # fixed
  static-white: '#ffffff'
  static-black: '#171717'
  overlay: '#3333333d'
  # states (base / dark / light / lighter)
  success-base: '#1fc16b'
  success-dark: '#0b4627'
  success-light: '#c2f5da'
  success-lighter: '#e3f7ec'
  error-base: '#fb3748'
  error-dark: '#681219'
  error-light: '#ffc0c5'
  error-lighter: '#ffebec'
  warning-base: '#fa7319'
  warning-dark: '#71330a'
  warning-light: '#ffd9c0'
  warning-lighter: '#fff3eb'
  information-base: '#335cff'
  information-dark: '#122368'
  information-light: '#c0d5ff'
  information-lighter: '#ebf1ff'
  feature-base: '#7d52f4'
  feature-light: '#cac0ff'
  feature-lighter: '#efebff'
  # dark theme (.dark class): only the roles that change, as dark-<role>
  dark-primary-light: '#1fc16b29'
  dark-primary-lighter: '#1fc16b1a'
  dark-bg-white-0: '#171717'
  dark-bg-weak-50: '#262626'
  dark-bg-soft-200: '#333333'
  dark-bg-sub-300: '#5c5c5c'
  dark-bg-surface-800: '#ebebeb'
  dark-bg-strong-950: '#ffffff'
  dark-text-strong-950: '#ffffff'
  dark-text-sub-600: '#a3a3a3'
  dark-text-soft-400: '#7b7b7b'
  dark-text-disabled-300: '#5c5c5c'
  dark-text-white-0: '#171717'
  dark-stroke-soft-200: '#262626'
  dark-stroke-edge: '#262626'
  dark-stroke-sub-300: '#5c5c5c'
  dark-stroke-strong-950: '#ffffff'
  dark-stroke-white-0: '#171717'
  dark-overlay: '#3333338f'
typography:
  title-h4:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 2.5rem
    letterSpacing: -0.005em
  title-h5:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 2rem
    letterSpacing: 0em
  title-h6:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.75rem
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.5rem
    letterSpacing: -0.015em
  label-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.5rem
    letterSpacing: -0.011em
  label-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
    letterSpacing: -0.006em
  label-xs:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1rem
    letterSpacing: 0em
  label-2xs:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1rem
    letterSpacing: 0em
  paragraph-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5rem
    letterSpacing: -0.011em
  paragraph-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
    letterSpacing: -0.006em
  paragraph-xs:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
    letterSpacing: 0em
  subheading-xs:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1rem
    letterSpacing: 0.04em
  subheading-2xs:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 0.75rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  '10': 0.625rem
  xl: 0.75rem
  2xl: 1rem
  '20': 1.25rem
  3xl: 1.5rem
  full: 9999px
spacing:
  unit: 0.25rem
  sidebar: 17rem
  sidebar-rail: 4.5rem
  composer: 43.75rem
components:
  app-panel:
    backgroundColor: '{colors.bg-white-0}'
    textColor: '{colors.text-strong-950}'
    rounded: '{rounded.3xl}'
  sidebar:
    backgroundColor: '{colors.bg-white-0}'
    textColor: '{colors.text-sub-600}'
    width: '{spacing.sidebar}'
  sidebar-collapsed:
    width: '{spacing.sidebar-rail}'
  sidebar-item:
    textColor: '{colors.text-sub-600}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.lg}'
    padding: 6px
    height: 32px
  sidebar-item-active:
    backgroundColor: '{colors.bg-weak-50}'
    textColor: '{colors.text-sub-600}'
  sidebar-item-new-chat:
    textColor: '{colors.primary-base}'
    typography: '{typography.label-sm}'
  sidebar-item-new-chat-hover:
    backgroundColor: '{colors.primary-alpha-10}'
  sidebar-section-title:
    textColor: '{colors.text-soft-400}'
    typography: '{typography.label-xs}'
  search-input:
    backgroundColor: '{colors.bg-weak-50}'
    textColor: '{colors.text-strong-950}'
    typography: '{typography.paragraph-sm}'
    rounded: '{rounded.10}'
    height: 36px
  button-ghost:
    textColor: '{colors.text-sub-600}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.lg}'
    size: 32px
  button-ghost-hover:
    backgroundColor: '{colors.bg-weak-50}'
    textColor: '{colors.text-strong-950}'
  button-primary:
    backgroundColor: '{colors.primary-base}'
    textColor: '{colors.static-white}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.10}'
    height: 40px
  composer:
    backgroundColor: '{colors.bg-white-0}'
    textColor: '{colors.text-strong-950}'
    typography: '{typography.paragraph-sm}'
    rounded: '{rounded.20}'
    width: '{spacing.composer}'
  composer-banner:
    textColor: '{colors.text-sub-600}'
    typography: '{typography.label-xs}'
  empty-state-title:
    textColor: '{colors.text-strong-950}'
    typography: '{typography.label-lg}'
  empty-state-subtitle:
    textColor: '{colors.text-soft-400}'
    typography: '{typography.label-sm}'
  tooltip:
    backgroundColor: '{colors.bg-strong-950}'
    textColor: '{colors.text-white-0}'
    typography: '{typography.paragraph-xs}'
    rounded: '{rounded.lg}'
    padding: 4px
  dropdown:
    backgroundColor: '{colors.bg-white-0}'
    textColor: '{colors.text-sub-600}'
    typography: '{typography.label-xs}'
    rounded: '{rounded.xl}'
    padding: 4px
  badge-pro:
    backgroundColor: '{colors.success-lighter}'
    textColor: '{colors.success-dark}'
    typography: '{typography.subheading-2xs}'
    rounded: '{rounded.sm}'
  avatar:
    backgroundColor: '{colors.bg-soft-200}'
    textColor: '{colors.text-strong-950}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    size: 40px
  modal:
    backgroundColor: '{colors.bg-white-0}'
    textColor: '{colors.text-strong-950}'
    rounded: '{rounded.3xl}'
  overlay-scrim:
    backgroundColor: '{colors.overlay}'
  alert-error:
    backgroundColor: '{colors.error-lighter}'
    textColor: '{colors.error-dark}'
    typography: '{typography.label-sm}'
  alert-warning:
    backgroundColor: '{colors.warning-lighter}'
    textColor: '{colors.warning-dark}'
  alert-information:
    backgroundColor: '{colors.information-lighter}'
    textColor: '{colors.information-dark}'
  alert-feature:
    backgroundColor: '{colors.feature-lighter}'
    textColor: '{colors.feature-base}'
---

# AI Workspace

## Overview

A quiet workspace for talking to an AI model: a white working panel framed by a light sidebar, gray text in four
weights of emphasis, and a single green accent that marks "new" and "yours" (the logo, New chat, the focus ring, the
PRO badge). Nothing animates for show; motion only explains a change of state (a sidebar folding, a menu opening).
The layout is an app shell exactly one screen tall: the page itself never scrolls, panes inside it do.

Built on AlignUI v1.2 (Radix UI + Tailwind CSS v4). The AlignUI token file is the source of the values below; this
document says which of them to use where. Screenshots at 390, 768, 1280, 1440 and 1920 wide are in `docs/images/`.

## Colors

Neutral gray carries almost everything; colour is information, never decoration.

- **Primary (#1daf61, green-600):** brand accent. New chat, the logo, the 1.4px focus ring on the composer and inputs,
  the send button when it can send. `primary-alpha-10` is the hover fill of green controls.
- **bg-white-0 / bg-weak-50 / bg-soft-200:** the panel, the quiet fills (search field, hovered rows, the composer's
  upgrade strip), dividers drawn as fills.
- **text-strong-950:** headings and what the user wrote. **text-sub-600:** navigation, menu items, controls.
  **text-soft-400:** section titles, placeholders, hints: never for information a user must read to act.
- **stroke-soft-200:** the panel border and section dividers.
- **stroke-edge:** a raised surface's 1px edge (cards, fields, dialogs): 8% black, so `#ebebeb` over white and darker
  over a backdrop; `#262626` in dark.
- **State colours** (success, error, warning, information, feature) come in base / dark / light / lighter. Use
  `lighter` as a background with `dark` as its text (alerts, badges); `base` only for icons and small marks.
- **Dark theme:** every role above has a dark value (`colors.dark-*`; flat keys because the 0.4.0 exporter rejects grouped names); components use roles, never raw palette steps,
  so they switch with the `.dark` class.

## Typography

Inter everywhere (`next/font`, variable `--font-inter`). AlignUI's scale is used by role, through its utility classes
(`text-label-sm`, `text-paragraph-xs`, …), never through raw sizes.

- **label-*** (500): anything a user operates or scans: navigation, buttons, menu items, the empty-state title
  (`label-lg`).
- **paragraph-*** (400): text a user reads or writes: messages, the composer, descriptions, tooltips.
- **subheading-*** (500, tracked out): tiny uppercase tags such as the PRO badge (`subheading-2xs`).
- **title-h4…h6**: page titles on projects and settings; the chat home has none.
- UI text uses the template's tight tracking (`tracking-spacing-tiny-2`, -0.005em) on body sizes.

## Layout

- One breakpoint decides the shell: **lg = 1024px**. At lg and up the sidebar is in the layout (272px, `spacing.sidebar`)
  and can fold to a 72px icon rail (`spacing.sidebar-rail`); the main panel is inset 6px and rounded (`rounded.3xl`)
  with a `stroke-soft-200` border. Below lg the sidebar becomes a full-width drawer from the left, the panel is
  edge to edge, and a 65px header with a bottom border sits on top.
- The composer is centred, at most 700px wide (`spacing.composer`) at lg+, full width minus 8px gutters below.
- Spacing is Tailwind's 4px unit (`spacing.unit`); sidebar rows are 32px high with 6px padding, groups 20px apart.
- Every size between 320px and 1920px must work: no layout values measured at one width.

## Elevation & Depth

Depth is layered soft shadows plus a hairline edge, never a hard drop shadow, and the two are separate classes:

- **Edge:** `ring-1 ring-stroke-edge`, the template's hairline as a colour: 8% black in light (`#ebebeb` over white),
  `#262626` in dark. Colour tokens stay CSS variables, so it follows the theme by itself.
  AlignUI's own menus, popovers, selects and fields already draw theirs this way (inset).
- **Depth:** `shadow-raised-xs` (fields, cards, the settings panel), `shadow-raised-sm` (the composer card),
  `shadow-raised-md` (menus, popovers, dialogs, the scroll button), from `src/styles/template.css`. These are the
  template's drop layers without the hairline. In dark mode they are 2-4% black on `#171717`, which is invisible: depth
  there comes from the edge alone, as in the template.
- **Focus:** `shadow-gray-shadow-2` / `shadow-complex-3` end in a 1.4px primary ring (same in both themes). A focused
  field drops its edge (`focus:ring-0`) so the primary ring is the only line.

A state that removes the shadow removes the edge too (`hover:shadow-none hover:ring-0`), as the template's hover does.
Don't use AlignUI's ring-baked shadows (`shadow-complex`, `shadow-custom-input`, `shadow-gray-shadow`…) in app code:
Tailwind writes their light value into the class, so their edge disappears in dark mode. `npm run design:check`
rejects them.

## Shapes

Rounded, never pill-shaped except avatars and toggles. Rows and small buttons `rounded.lg` (8px), fields
`rounded.10` (10px), menus `rounded.xl` (12px), the composer `rounded.20` (20px at lg, 16px below), the main panel and
modals `rounded.3xl` (24px), avatars `rounded.full`.

## Motion & Micro-interaction

Motion tokens are written here in prose: the `motion` front-matter group is in the spec but not yet in the
`@google/design.md` 0.4.0 schema (its linter ignores it). In code they are Tailwind durations and easings.

- `state-change` 200ms ease-out: hovers, colour and icon swaps.
- `sidebar` 300ms ease-in-out: the drawer sliding in and the rail swapping with the full sidebar (opacity).
- `surface-enter` / `surface-exit` 400ms ease-out: the settings modal (a bottom sheet below lg) and its scrim.
- `tooltip-delay` 300ms before a tooltip opens; moving to the next trigger within 300ms opens it at once.
- Everything respects `prefers-reduced-motion`: durations collapse to 0, states still change.

## Voice & Content Strategy

Short, plain and second person: "Hello Alex", "What can I help you with today?", "AI can make mistakes - please
double-check". Labels are verbs or nouns of one or two words (New chat, Projects, Share, Export). Sentence case
everywhere except the PRO tag.

## Components

AlignUI base components live in `src/components/ui/` exactly as published (Button, CompactButton, Input, Textarea,
Tooltip, Dropdown, Popover, Modal, Drawer, Avatar, Badge, Switch, Select, Divider, SegmentedControl, TabMenuVertical,
Kbd, Label, Hint). App components compose them and the tokens above:

- **Sidebar** (`sidebar`, `sidebar-item`, `sidebar-item-active`, `sidebar-item-new-chat`, `sidebar-section-title`):
  logo + fold button, search, New chat / Projects / Library, Pinned, Recents and Yesterday groups, profile row.
- **Chat header:** desktop breadcrumb (project / chat + menu) floating in the panel; mobile bar with menu, model,
  project, new chat and more.
- **Composer** (`composer`, `composer-banner`): upgrade strip, auto-growing text field, add button, model picker,
  send button. Its text is `paragraph-sm` below lg and 15px / 24px at lg, the one size outside the scale (as in the
  reference); the send button turns `bg-strong-950` when there is something to send.
- **Empty state** (`empty-state-title`, `empty-state-subtitle`): logo mark, greeting, prompt.
- **Tooltip, dropdown, modal, badge-pro, avatar, alerts:** as their tokens say.

## Do's and Don'ts

- Do use the role tokens (`bg-bg-white-0`, `text-text-sub-600`, `ring-stroke-soft-200`); don't use palette steps
  (`bg-gray-50`) or hex values in components.
- Do keep green for the brand accent and focus; don't use it for success messages (use `success-*`).
- Don't put information a user must read in `text-soft-400`: it is below 4.5:1 on white by design (2.5:1) and is
  reserved for placeholders, hints and section titles.
- White on `primary-base` is 2.85:1 (AlignUI's filled primary button): keep it to short labels of 14px medium or
  larger, or use the ghost/stroke button for anything longer. `feature-base` on `feature-lighter` is 4.1:1: badges only.
- The linter's orphaned-token warnings are expected: the full role palette and the dark theme are documented even
  where no component above names them.
- Do change a value here first, then in `src/styles/template.css` or by regenerating the AlignUI file; `npm run
design:check` must pass.
- Don't edit `src/components/ui/`: wrap or compose instead, so AlignUI updates can be copied in again.
