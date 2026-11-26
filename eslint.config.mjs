import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/** AlignUI source copied verbatim from the v1.2 docs (see docs/SPEC.md#vendor-code): not edited, so not held to app rules. */
const alignuiVendor = [
  'src/components/ui/**',
  'src/hooks/use-tab-observer.ts',
  'src/utils/cn.ts',
  'src/utils/tv.ts',
  'src/utils/polymorphic.ts',
  'src/utils/recursive-clone-children.tsx',
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: alignuiVendor,
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**']),
]);

export default eslintConfig;
