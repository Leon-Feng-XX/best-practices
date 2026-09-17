# Best Practices

A modern Vue 3 best-practices starter with TypeScript, Vite, Pinia, Tailwind CSS, Element Plus, Vitest, Playwright, and a complete CI/CD pipeline.

## Tech Stack

- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Language**: TypeScript
- **Build**: Vite 8 with Rolldown
- **Routing**: Vue Router 5
- **State**: Pinia 4 (client) + TanStack Query v5 (server)
- **Styling**: Tailwind CSS 4 + custom design system
- **UI Library**: Element Plus (on-demand)
- **i18n**: vue-i18n 11 (EN / zh-CN)
- **Icons**: unplugin-icons + Iconify
- **Forms**: vee-validate 4 + zod 3
- **HTTP**: axios with interceptors
- **Lint**: ESLint 9 flat config + `@antfu/eslint-config`
- **Test**: Vitest 5 + `@vue/test-utils` + Playwright
- **Package Manager**: pnpm 10

## Requirements

- Node.js `>= 22.12.0` (see `.nvmrc`)
- pnpm `>= 10.0.0` (see `packageManager` in `package.json`)

## Quick Start

```bash
git clone <your-repo-url> best-practices
cd best-practices
pnpm install
pnpm dev
```

Open http://localhost:5173

## Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `pnpm dev`           | Start dev server with HMR         |
| `pnpm build`         | Type-check + build for production |
| `pnpm build-only`    | Build without type-check          |
| `pnpm build:staging` | Build for staging environment     |
| `pnpm preview`       | Preview production build          |
| `pnpm type-check`    | Run TypeScript type checking      |
| `pnpm lint`          | Lint and auto-fix                 |
| `pnpm lint:ci`       | Lint without fixing (CI)          |
| `pnpm test`          | Run unit tests once               |
| `pnpm test:unit`     | Run unit tests in watch mode      |
| `pnpm test:coverage` | Run unit tests with coverage      |
| `pnpm test:e2e`      | Run Playwright E2E tests          |
| `pnpm test:e2e:ui`   | Open Playwright UI mode           |

## Environment Variables

| Variable            | Description                              | Required |
| ------------------- | ---------------------------------------- | -------- |
| `VITE_APP_TITLE`    | Browser tab title                        | Yes      |
| `VITE_API_BASE_URL` | Frontend request base path (e.g. `/api`) | Yes      |
| `VITE_PROXY_TARGET` | Dev-only proxy target (absolute URL)     | Dev only |
| `VITE_LOG_LEVEL`    | `debug` / `info` / `warn` / `error`      | No       |

## Environments

### Development

- Files: `.env` + `.env.development`
- Command: `pnpm dev`
- Log level: `debug`
- Backend: proxied via `VITE_PROXY_TARGET` (default `http://localhost:8080`)

### Staging

- File: `.env.staging`
- Command: `pnpm build:staging`
- Log level: `info`
- Backend: `https://api-staging.example.com`
- Deployment: auto on push to `main` via `.github/workflows/deploy-staging.yml`

### Production

- File: `.env.production`
- Command: `pnpm build`
- Log level: `warn`
- Backend: `https://api.example.com`
- Deployment: on version tags (`v*`) via `.github/workflows/deploy-production.yml`

**Local overrides**: create `.env.local` (gitignored) to override values locally.

## Features

- **Vue 3** + `<script setup>` + TypeScript
- **Vite 8** with Rolldown
- **Vue Router 5** with lazy-loaded routes
- **Pinia 4** for client state
- **TanStack Query v5** for server state (caching, deduplication, background refresh)
- **Tailwind CSS 4** with a layered design system
- **Element Plus** with on-demand imports and brand color override
- **vue-i18n 11** with EN / zh-CN and locale persistence
- **Dark mode** with class-based toggle (Tailwind + Element Plus aligned)
- **unplugin-icons** + Iconify (20k+ icons, compile-time)
- **vee-validate + zod** for type-safe form validation
- **Centralized logger** with pluggable handlers
- **Axios client** with interceptors and typed wrappers
- **Vitest + Playwright** for unit and E2E testing
- **ESLint 9 flat config** + Prettier (via `@antfu/eslint-config`)
- **Husky + lint-staged + commitlint** for git workflow
- **CI/CD** via GitHub Actions (lint → test → build → deploy)

## Project Structure

```
src/
├── api/              # HTTP client + per-resource modules
│   ├── client.ts
│   ├── types.ts
│   └── modules/
├── components/       # Global reusable components
├── composables/      # Reusable composition functions (e.g. useTheme)
├── locales/          # i18n messages (en, zh-CN)
├── queries/          # TanStack Query hooks + query keys
├── router/           # Vue Router configuration
├── schemas/          # zod schemas (single source of truth)
├── stores/           # Pinia stores
├── styles/           # Design system (theme / base / components / utilities)
├── types/            # Auto-generated type declarations (committed)
├── utils/            # Utilities (logger, helpers)
├── views/            # Page-level components
├── App.vue           # Root component
└── main.ts           # Application entry
```

## Design System

All design tokens live in `src/styles/theme.css` (via Tailwind 4 `@theme`).
Change `--color-primary-*` there to rebrand Tailwind **and** Element Plus globally.

```
src/styles/
├── main.css                 # Entry — imports everything below
├── theme.css                # Design tokens (@theme) + dark overrides
├── base.css                 # Element-level defaults
├── element-plus.css         # Maps --el-* vars to our tokens
├── components/              # Reusable component classes (.btn, .card, …)
└── utilities/               # Custom Tailwind utilities
```

Example:

```vue
<template>
  <div class="card">
    <div class="card__header">
      <h2 class="card__title">
        Title
      </h2>
    </div>
    <div class="card__body">
      <button class="btn btn--primary">
        Click
      </button>
    </div>
  </div>
</template>
```

## Data Layer

```
src/api/
├── client.ts                # Axios instance + interceptors + typed wrappers
├── types.ts                 # Shared API types
└── modules/                 # Per-resource API functions

src/queries/
├── query-keys.ts            # Centralized query-key factory
└── use-*.ts                 # Query / mutation hooks
```

**Conventions:**

- Components never call `axios` directly — use `@/api/modules/*`
- Reads go through `useXxxQuery()` hooks
- Writes go through `useXxxMutation()` hooks
- Query keys are always from `@/queries/query-keys`

Example:

```ts
import { useCreateUserMutation, useUsersQuery } from '@/queries/use-users'

const { data, isPending, error } = useUsersQuery({ page: 1, size: 20 })
const createUser = useCreateUserMutation()

createUser.mutate({ name: 'Alice', email: 'alice@example.com' })
```

See `/data-fetching` for a working demo.

## Forms

Schema-first validation with `zod` + `vee-validate` + Element Plus:

```ts
// src/schemas/user.ts
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type UserFormValues = z.infer<typeof userSchema>
```

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { userSchema } from '@/schemas/user'

const { values, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(userSchema),
})
</script>

<template>
  <el-form @submit.prevent="handleSubmit(onSubmit)">
    <el-form-item label="Email" :error="errors.email">
      <el-input v-model="values.email" />
    </el-form-item>
  </el-form>
</template>
```

See `/form-demo` for a working example.

## Icons

Two ways, depending on whether the icon name is known at compile time:

- **Static** (compile-time optimized): `<i-mdi-home class="w-5 h-5" />`
- **Dynamic** (runtime name): install `@iconify/vue` and use `<Icon :icon="name" />`

Add new icon sets:

```bash
pnpm add -D @iconify-json/<set-name>
```

Then register in `vite.config.ts` → `IconsResolver({ enabledCollections: [..., '<set-name>'] })`.

## Theming

Three modes: `light` / `dark` / `auto`. Managed by `useTheme()` (`@/composables/useTheme`),
persisted to `localStorage`. Toggling `<html class="dark">` switches **both** Tailwind
and Element Plus.

```ts
import { useTheme } from '@/composables/useTheme'

const { mode, setTheme } = useTheme()
setTheme('dark')
```

## i18n

- Locales in `src/locales/` (TS modules — type-safe keys)
- Add a locale: create `xx.ts`, register in `locales/index.ts`
- Switch at runtime: `setLocale('en' | 'zh-CN')`
- Element Plus locale is synced automatically via `<el-config-provider>`

## Logging

Centralized logger at `src/utils/logger.ts`:

```ts
import { logger } from '@/utils/logger'

logger.debug('Detailed debug info') // dev only
logger.info('Informational message') // dev + staging
logger.warn('Something looks off') // all environments
logger.error('Something failed') // all environments
```

Extend with custom handlers (e.g. Sentry):

```ts
import { addLogHandler } from '@/utils/logger'

addLogHandler(({ level, args }) => {
  if (level === 'error') {
    // Sentry.captureException(args[0])
  }
})
```

## Conventions

- **Auto-imported**: Vue / Vue Router / Pinia official APIs (`ref`, `useRouter`, `defineStore`, ...)
- **Explicit imports**: local files (`@/components/...`, `@/utils/...`)
- **Commit messages**: [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation
  - `chore:` maintenance
  - `refactor:` code refactoring
  - `test:` tests
  - `build:` build system
  - `ci:` CI configuration
  - `perf:` performance
  - `style:` formatting
  - `revert:` revert

## Git Hooks

- **`pre-commit`**: ESLint on staged files via `lint-staged`
- **`commit-msg`**: validate commit message with `commitlint`

## CI/CD

### CI (`.github/workflows/ci.yml`)

Runs on push to `main` and every PR: lint → type-check → unit tests → E2E → build.

Artifacts (coverage, Playwright reports) are uploaded for 7 days.

### Staging deployment (`.github/workflows/deploy-staging.yml`)

Runs on push to `main`. Builds with `pnpm build:staging`, uploads `dist/` as artifact.
Replace the placeholder with your hosting platform (examples: Vercel, Netlify, rsync).

### Production deployment (`.github/workflows/deploy-production.yml`)

Runs when a version tag is pushed (e.g. `v1.0.0`) or manually via `workflow_dispatch`.
Builds with `pnpm build` and uploads `dist/` as a 30-day artifact.

Requires approval via the `production` GitHub Environment (Settings → Environments → production → Required reviewers).

To release a new version:

```bash
git tag v1.0.0
git push origin v1.0.0
```

To roll back, use `workflow_dispatch` with the tag of a previous version.
