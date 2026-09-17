import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  vue: true,
  typescript: true,
  formatters: true,
  pnpm: false,
  ignores: [
    'playwright-report',
    'test-results',
    'src/types/auto-imports.d.ts',
    'src/types/components.d.ts',
  ],
})
