<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This project

An AI chat workspace on Next.js 16 + AlignUI v1.2. Read before changing anything:

- `DESIGN.md`: the design system (tokens and how to use them). Change tokens there first, then the CSS;
  `npm run design:check` must pass.
- `docs/SPEC.md`: structure, routes, behaviour and the rules (tokens only, vendor code untouched, server first,
  one `lg` breakpoint, every screen size, accessible by default).

### Building new UI

Start from what exists: an AlignUI component in `src/components/ui`, a pattern in DESIGN.md's `components`, or a
similar screen. Then:

- **Colours:** role tokens only (`bg-bg-white-0`, `text-text-sub-600`, `stroke-*`, `primary-*`), never hex or palette
  steps; they switch with the theme by themselves, so no `dark:` variants.
- **Edges and depth:** a raised surface is `ring-1 ring-stroke-edge` plus `shadow-raised-xs|sm|md`. Never AlignUI's
  `shadow-complex*`, `-custom-input`, `-gray-shadow*` in app code (their edge vanishes in dark). A state that drops
  the shadow drops the ring too (`hover:ring-0`).
- **Variables in classes:** Tailwind v4 spelling `w-(--x)` / `[mask:var(--x)]`; the v3 `w-[--x]` is silently dropped.
- **Layout:** one breakpoint, `lg:`, in CSS; works at any width, not just the ones in the tests.
- **Vendor:** compose `src/components/ui` components, don't edit them (a new copy from the AlignUI docs: check it for
  v3 spellings).
- **Check in both themes** (profile menu → Dark Mode) before calling it done.

`npm run design:check` enforces the colour, shadow and variable rules.

Before finishing: `npm run check`, `npm run build`, `npm run test:e2e`.
