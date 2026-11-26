# AI Workspace: product and UI spec

The starter is a Next.js 16 + TypeScript app for an AI chat workspace, built on AlignUI v1.2's free base components,
with a layout inspired by AlignUI's AI template. The look is defined in
[`DESIGN.md`](../DESIGN.md); this document defines structure, behaviour and the rules for changing either.

## Stack

| Concern       | Choice                                                                      | Notes                                            |
| ------------- | --------------------------------------------------------------------------- | ------------------------------------------------ |
| Framework     | Next.js 16.4 (App Router, Turbopack, Cache Components, Partial Prefetching) | `next.config.ts`                                 |
| Language      | TypeScript, `strict`                                                        | `npm run typecheck`                              |
| Styling       | Tailwind CSS 4.3 + AlignUI v1.2 tokens                                      | `src/app/globals.css`, `src/styles/template.css` |
| Components    | AlignUI base components (Radix UI + `tailwind-variants` 3)                  | `src/components/ui/`                             |
| Icons         | Remix Icon (`@remixicon/react`)                                             | names resolved from the reference                |
| Font          | Inter via `next/font/google` (`--font-inter`)                               | `src/app/layout.tsx`                             |
| Theme         | `next-themes`, `.dark` class, light by default                              | `src/components/providers/theme-provider.tsx`    |
| Tests         | Vitest + Testing Library (unit), Playwright (e2e)                           | `tests/`, `e2e/`                                 |
| Design tokens | `@google/design.md` lint + `scripts/design-check.mjs`                       | `npm run design:lint`, `npm run design:check`    |

## Folder structure

```
DESIGN.md                    design system (source of truth for tokens and their use)
docs/SPEC.md                 this file
scripts/design-check.mjs     DESIGN.md <-> CSS drift check
src/
  app/
    layout.tsx               root: font, theme, metadata
    globals.css              AlignUI token file (CLI output + 4 documented deviations)
    not-found.tsx
    (dashboard)/             everything inside the app shell
      layout.tsx             sidebar + main panel; providers; the settings dialog
      page.tsx               new chat (home)
      chat/[id]/             a conversation
      projects/, projects/[slug]/
      library/, help/, terms/              placeholders the navigation links to
      loading.tsx, error.tsx
    (auth)/login/            outside the shell
  components/
    ui/                      AlignUI vendor code: only the patches listed under Rules → 2
    layout/                  shell: sidebar (+ nav, history, profile, rail), chat header, panel, skeleton
    chat/                    composer, conversation, empty state, chat menus
    projects/                projects browser, project detail, create-project modal
    settings/                settings dialog, its URL helpers, primitives, sections/ (one file per page)
    providers/               theme, sidebar state, selected model
    brand/                   logo mark
  config/                    site, navigation, settings sections (typed data, no JSX)
  hooks/                     use-mounted; use-tab-observer (AlignUI vendor)
  lib/data/                  the data boundary: async repository + fixtures
  types/                     domain types
  utils/                     cn, tv, polymorphic, recursive-clone-children (AlignUI vendor); format
  styles/template.css        tokens the template adds on top of AlignUI
  env.ts                     validated environment
tests/                       unit tests
e2e/                         end-to-end tests at the five reference sizes
```

## Rules

1. **Design tokens only.** Components use AlignUI role classes (`bg-bg-white-0`, `text-text-sub-600`,
   `text-label-sm`, `rounded-10`, `shadow-raised-md`, `w-sidebar`) — never raw hex, palette steps or arbitrary pixel
   values. The exceptions are the reference's own odd radii (`rounded-[14px]`, `rounded-[15px]`, `rounded-[19px]`,
   `rounded-[9px]`, `rounded-[5px]`, `rounded-[7px]`) and the composer's 15px text at lg; each matches the template.
   `npm run design:check` rejects arbitrary colours (`bg-[#…]`) and Tailwind v3 variable syntax (`w-[--x]`) anywhere
   in `src`.
2. **Vendor code stays vendor code.** <a id="vendor-code"></a>`src/components/ui/*`, `src/utils/{cn,tv,polymorphic,recursive-clone-children}`
   and `src/hooks/use-tab-observer.ts` are copied verbatim from the AlignUI v1.2 docs; ESLint and Prettier skip them.
   Wrap or compose instead of editing. The docs still carry a few Tailwind v3 spellings that v4 compiles to invalid
   CSS (silently dropped); these are patched in place, marked with a comment, and must be re-applied after copying a
   newer version: `switch.tsx` (`[mask:var(--mask)]`, the thumb's dot), `select.tsx` (`min-w-(--radix-select-trigger-width)`,
   `max-h-(--radix-select-content-available-height)`). `radio.tsx` was added from the template's v1.2 source.
   `src/app/globals.css` is the output of `npx @alignui/cli tailwind` (Green, Gray, hex, no prefix, CSS-only) with
   the deviations listed at its top; re-apply them after regenerating.
   `tailwind-variants` is pinned to 3.x because AlignUI's `tv.ts` uses the 3.x `twMergeConfig` option.
3. **Edges are rings, not shadows.** A surface's 1px edge is `ring-1 ring-stroke-edge` (follows the theme) next to a
   ring-free `shadow-raised-xs/sm/md`; a state that clears the shadow clears the ring too (`hover:ring-0`). AlignUI's
   ring-baked shadows (`shadow-complex`, `-custom-input`, `-gray-shadow`…) are re-themed in `.dark`, but Tailwind
   inlines their light value, so their edge vanishes in dark mode: `npm run design:check` rejects them in app code.
   **Layers:** app chrome stays at `z-40` or below; `z-50` is AlignUI's popup layer (dialogs, menus, selects,
   tooltips). `npm run design:check` rejects `z-50`+ in app code.
4. **DESIGN.md first.** To change a token, change DESIGN.md, then the CSS (`template.css`, or regenerate the AlignUI
   file); `npm run design:check` must pass. To add a component pattern, add it to DESIGN.md's `components`.
5. **Server first.** Pages and layouts are Server Components that read data from `@/lib/data`; `'use client'` only
   for interactive leaves (sidebar, menus, composer, conversation, settings). Client components get data as props.
6. **One breakpoint for the shell:** `lg` (1024px). Layout differences between mobile and desktop are CSS (`lg:`), not
   `innerWidth` in JavaScript — the reference switches its header in JS after hydration and flashes; this starter
   renders both headers and lets CSS pick, so there is no flash.
7. **Every screen size.** Nothing is tuned to a captured width; e2e runs at 390, 768, 1280, 1440 and 1920.
8. **Accessible by default.** Icon buttons have labels, menus are Radix (keyboard, focus, `aria-*`), the sidebar
   marks the current page, motion respects `prefers-reduced-motion`.

## Routes

| Route                                   | Renders                                                                                  | Data                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------ |
| `/`                                     | empty state + composer; sending opens `/chat/1` (no backend)                             | user                     |
| `/chat/[id]`                            | conversation; sending appends a message and a placeholder reply                          | chat, messages, projects |
| `/projects`                             | search, sort, cards; Create project adds locally                                         | projects                 |
| `/projects/[slug]`                      | header, star, menu, composer, files and instructions, chats; `?empty=true` = empty state | project, chats           |
| `?settings=<section>` on any route      | the settings dialog over that page (a reload or a shared link keeps it)                  | user                     |
| `/settings`, `/settings/[section]`      | redirect to `/?settings=<section>` (next.config.ts), for old links and no-JavaScript     | —                        |
| `/library`, `/help`, `/terms`, `/login` | placeholders                                                                             | —                        |

Dynamic routes read `params` inside `<Suspense>` with a panel skeleton, so client navigations show the shell at once
(Cache Components' instant navigation). <a id="not-found"></a>Consequence: an unknown id inside a streamed route
renders the not-found UI with status 200 (the shell was already sent) and `noindex`; unknown paths are a real 404.

## Behaviour (from the reference's scripts)

| Element         | Trigger                                     | Result                                                                                                                                                     | Timing                         |
| --------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Sidebar (lg+)   | Toggle sidebar / click on the rail          | 272px ↔ 72px rail; full nav and rail cross-fade                                                                                                            | 300ms ease-in-out              |
| Sidebar (<lg)   | menu button; close button; any navigation   | drawer slides in from the left / out                                                                                                                       | 300ms                          |
| Rail search     | click                                       | expands the sidebar, then focuses search                                                                                                                   | focus after 350ms              |
| Sidebar search  | typing                                      | history filtered by title; Escape clears                                                                                                                   | —                              |
| Tooltips        | hover / focus                               | after 300ms; the next one within 300ms opens at once                                                                                                       | Radix Provider                 |
| Chat title menu | chevron                                     | Pinned, Rename, Delete                                                                                                                                     | —                              |
| More menu       | ⋮ / ⋯                                       | Share, Export                                                                                                                                              | —                              |
| Composer        | Enter / Shift+Enter / paste / drop / + menu | send / new line / attach                                                                                                                                   | send button dark when sendable |
| Profile         | profile row / rail avatar                   | identity, Dark Mode, Settings, Language, Need help?, Log out, version                                                                                      | —                              |
| Settings        | Settings / Language / Upgrade links         | dialog (lg+) or sheet (<lg) over the page; `?settings=<section>` opens it, sections replace the param, close goes Back (or drops the param after a reload) | —                              |

## Data

`src/lib/data/index.ts` is the only import path for data. Every function is async and returns plain typed objects
(`src/types`). Replace the fixtures with API, database or AI SDK calls there; nothing else changes. The composer's
`onSend` and the chat/project menu callbacks are the places to wire mutations (server actions or route handlers).

## Not included

Authentication, persistence, a model API, file storage, billing. Each has a marked place: `/login`, `lib/data`,
`Conversation`'s placeholder reply, the composer's attachments, Settings → Plans & Billing.

## Verification

`npm run check` (typecheck, lint, DESIGN.md lint, drift check, unit tests), `npm run build`, `npm run test:e2e`.
Screenshots: `docs/images/`.
