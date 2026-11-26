#!/usr/bin/env node
// DESIGN.md <-> CSS drift check.
// Exports DESIGN.md as a Tailwind v4 @theme (@google/design.md) and compares every value with what the app's CSS
// resolves to: Tailwind's default theme, then the AlignUI token file (src/app/globals.css), then
// src/styles/template.css. `--color-dark-<role>` is compared with <role> inside the `.dark` block.
// Exit 1 on any mismatch or on a DESIGN.md token the CSS does not define.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'package.json'));
const read = (p) => readFileSync(path.join(root, p), 'utf8');

const block = (css, start) => {
  const i = css.indexOf(start);
  if (i < 0) return '';
  let depth = 0;
  for (let j = css.indexOf('{', i); j < css.length; j++) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}' && --depth === 0) return css.slice(i, j + 1);
  }
  return css.slice(i);
};
const vars = (css) => {
  const out = new Map();
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    out.set(m[1], m[2].trim().replace(/\s+/g, ' '));
  }
  return out;
};

const twTheme = readFileSync(path.join(path.dirname(require.resolve('tailwindcss/package.json')), 'theme.css'), 'utf8');
const globals = read('src/app/globals.css');
const template = read('src/styles/template.css');
const light = new Map([
  ...vars(block(twTheme, '@theme')),
  ...vars(block(globals, '@theme {')),
  ...vars(block(template, '@theme')),
]);
const dark = new Map([...light, ...vars(block(globals, '.dark {')), ...vars(block(template, '.dark {'))]);

const resolve = (map, value, depth = 0) => {
  const m = value?.match(/^var\((--[\w-]+)(?:,\s*(.+))?\)$/);
  if (!m || depth > 10) return value;
  return resolve(map, map.get(m[1]) ?? m[2], depth + 1);
};

const hex = (v) => {
  let s = v.toLowerCase();
  const rgba = s.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (rgba) {
    const [, r, g, b, a] = rgba;
    s =
      '#' +
      [r, g, b].map((n) => Number(n).toString(16).padStart(2, '0')).join('') +
      (a === undefined || Number(a) === 1
        ? ''
        : Math.round(Number(a) * 255)
            .toString(16)
            .padStart(2, '0'));
  }
  if (/^#[0-9a-f]{3,4}$/.test(s)) s = '#' + [...s.slice(1)].map((c) => c + c).join('');
  if (/^#[0-9a-f]{8}$/.test(s) && s.endsWith('ff')) s = s.slice(0, 7);
  if (s === 'white') s = '#ffffff';
  return s;
};
const norm = (v) => {
  if (v === undefined) return v;
  const s = String(v).trim();
  if (/^(#|rgb|white)/i.test(s)) return hex(s);
  return s
    .replace(/(^|[\s(,-])\.(\d)/g, '$10.$2')
    .replace(/^0(px|rem|em)$/, '0')
    .replace(/^(-?\d*\.?\d+)(rem|em|px)$/, (_, n, u) => `${Number(n)}${u}`);
};

// tokens DESIGN.md names that the CSS spells differently, or that are prose-only on purpose
const ALIAS = { '--color-primary': '--color-primary-base', '--spacing-unit': '--spacing', '--radius-full': null };
const SKIP = (name) => /^--font-[\w-]+$/.test(name) && !/^--font-weight/.test(name); // families: CSS uses next/font variables

// the package's exports map hides package.json, so find it from the project's node_modules
const pkgJson = path.join(root, 'node_modules', '@google', 'design.md', 'package.json');
const cli = path.join(path.dirname(pkgJson), JSON.parse(readFileSync(pkgJson, 'utf8')).bin.designmd);
const exported = execFileSync(process.execPath, [cli, 'export', '--format', 'css-tailwind', 'DESIGN.md'], {
  cwd: root,
  encoding: 'utf8',
});
if (!exported.includes('@theme')) {
  console.error('design:check: export failed:\n' + exported);
  process.exit(1);
}

const problems = [];
let checked = 0;
for (const [name, value] of vars(block(exported, '@theme'))) {
  if (SKIP(name) || ALIAS[name] === null) continue;
  const isDark = name.startsWith('--color-dark-');
  // the exporter writes a type role's line height, tracking and weight as --leading-/--tracking-/--font-weight-<role>;
  // Tailwind v4 (and AlignUI) attach them to the size: --text-<role>--line-height / --letter-spacing / --font-weight
  const typeRole = name.match(/^--(leading|tracking|font-weight)-((?:title|label|paragraph|subheading)-[\w-]+)$/);
  const cssName = isDark
    ? name.replace('--color-dark-', '--color-')
    : typeRole
      ? `--text-${typeRole[2]}--${{ leading: 'line-height', tracking: 'letter-spacing', 'font-weight': 'font-weight' }[typeRole[1]]}`
      : (ALIAS[name] ?? name);
  const map = isDark ? dark : light;
  const actual = resolve(map, map.get(cssName));
  checked++;
  if (actual === undefined) problems.push(`${name}: in DESIGN.md (${value}) but not defined in the CSS (${cssName})`);
  else if (norm(actual) !== norm(value)) problems.push(`${name}: DESIGN.md ${value}  !=  CSS ${cssName} ${actual}`);
}

// App code must not use a shadow the .dark block re-themes. Tailwind writes a theme shadow's (light) value into its
// utility, so the dark value never reaches the page; those AlignUI shadows also carry a 1px hairline edge, which then
// vanishes on the dark background. Edges are drawn with ring-1 ring-stroke-edge next to a ring-free shadow-raised-*
// (DESIGN.md → Elevation & Depth). The vendor components (src/components/ui) are AlignUI's own and are not scanned.
const themedShadows = [...vars(block(globals, '.dark {')).keys()]
  .filter((n) => n.startsWith('--shadow-'))
  .map((n) => n.slice('--shadow-'.length));
const usesThemed = new RegExp(`(?<![\\w-])shadow-(${themedShadows.join('|')})(?![\\w-])`, 'g');
const appFiles = (dir) =>
  readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) return rel === path.join('src', 'components', 'ui') ? [] : appFiles(rel);
    return /\.(tsx?|css)$/.test(e.name) && !rel.endsWith('globals.css') ? [rel] : [];
  });
for (const file of appFiles('src')) {
  // CSS comments may name these shadows; blank them (keeping line numbers) before matching
  (file.endsWith('.css') ? read(file).replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')) : read(file))
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(usesThemed)) {
        problems.push(
          `${file.replaceAll('\\', '/')}:${i + 1}: ${m[0]} is re-themed in .dark but Tailwind inlines its light value; ` +
            'use shadow-raised-* with ring-1 ring-stroke-edge',
        );
      }
      // Layers (DESIGN.md → Elevation & Depth): z-50 and up belongs to AlignUI's portals (menus, dialogs, popovers,
      // selects, tooltips). App chrome above it hides them, as the mobile drawer once hid the profile menu.
      for (const m of line.matchAll(/(?<![\w-])z-(?:[5-9]\d|\d{3,}|\[\d+\])(?![\w-])/g)) {
        problems.push(
          `${file.replaceAll('\\', '/')}:${i + 1}: ${m[0]} is in the popup layer (50+); app layers stay at z-40 or below`,
        );
      }
    });
}

// Class spellings that compile without an error but do nothing, or bypass the tokens (docs/SPEC.md rules 1-2), in
// every source file, vendor ones included (a newly copied AlignUI component can bring them in):
//  - Tailwind v3 variable shorthand (`w-[--x]`, `[mask:--x]`): v4 writes `width: --x`, invalid, so the browser drops it.
//    v4 spells it `w-(--x)` or `w-[var(--x)]`.
//  - arbitrary colours (`bg-[#fff]`, `text-[rgb(...)]`): not themed, so wrong in dark mode. Use a role token.
const silent = [
  [/-\[--[\w-]+\]|\[[a-z-]+:--[\w-]+\]/g, 'Tailwind v3 variable syntax, dropped by v4; write -(--x) or [var(--x)]'],
  [/-\[(?:#|rgba?\(|hsla?\(|oklch\()/g, 'arbitrary colour; use a DESIGN.md colour token'],
];
const sourceFiles = (dir) =>
  readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name);
    return e.isDirectory() ? sourceFiles(rel) : /\.tsx?$/.test(e.name) ? [rel] : [];
  });
for (const file of sourceFiles('src')) {
  read(file)
    .split('\n')
    .forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments may quote the wrong spelling
      for (const [re, why] of silent) {
        for (const m of line.matchAll(re)) problems.push(`${file.replaceAll('\\', '/')}:${i + 1}: ${m[0]}: ${why}`);
      }
    });
}

if (problems.length) {
  console.error(
    `design:check: ${problems.length} of ${checked} problems (DESIGN.md vs the CSS, class rules)\n  ` +
      problems.join('\n  '),
  );
  process.exit(1);
}
console.log(`design:check: ${checked} tokens in DESIGN.md match the CSS`);
