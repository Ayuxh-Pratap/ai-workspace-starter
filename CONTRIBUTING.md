# Contributing

Thanks for helping. Issues and pull requests are welcome.

## Setup

```bash
npm install
npm run dev
```

Node 22.19 or newer (24 recommended, see `.nvmrc`).

## Before you open a pull request

```bash
npm run check       # typecheck, lint, DESIGN.md lint, DESIGN.md <-> CSS check, unit tests
npm run build
npm run test:e2e    # Playwright at 390, 768, 1280, 1440 and 1920 wide
```

## The rules

Read [`DESIGN.md`](./DESIGN.md) and the rules in [`docs/SPEC.md`](./docs/SPEC.md#rules) first. In short:

- Use design tokens only: role classes like `bg-bg-white-0` and `text-text-sub-600`, never hex values or `dark:`
  variants.
- Draw a surface's edge with `ring-1 ring-stroke-edge` and its depth with `shadow-raised-xs|sm|md`.
- Leave `src/components/ui/` as AlignUI ships it: compose those components, don't edit them.
- Change a token in `DESIGN.md` first, then in the CSS.
- Check every change in light and dark mode, below and above `lg` (1024px).

`npm run design:check` enforces the token, shadow and class-syntax rules.

## Commits

Short, imperative, one line (`Add model picker to the composer`). One logical change per pull request.
