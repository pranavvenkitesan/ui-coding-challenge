# Coding Challenge

React + React Router + TypeScript, built with Vite.

## Stack

- **React 19** + **TypeScript** (strict, `noUncheckedIndexedAccess`)
- **React Router** (data router: `createBrowserRouter` + nested layout routes)
- **Vite** for dev server and build
- **Vitest** + **React Testing Library** for tests
- **oxlint** + **Prettier**
- GitHub Actions CI (lint, test, build)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script              | Purpose                         |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start dev server                |
| `npm run build`     | Type-check and production build |
| `npm run preview`   | Preview the production build    |
| `npm run typecheck` | Type-check only                 |
| `npm run lint`      | Lint with oxlint                |
| `npm run format`    | Format with Prettier            |
| `npm test`          | Run tests in watch mode         |
| `npm run test:run`  | Run tests once                  |

## Structure

```
src/
  routes/       route table (routes.tsx) and browser router (router.tsx)
  layouts/      RootLayout: header, nav, <Outlet />
  pages/        route-level components, 404 and route error page
  components/   shared UI components
  types/        shared types
  test/         test setup and renderWithRouter helper
```

Imports use the `@/` alias for `src/`.

### Adding a route

1. Create a page in `src/pages/`.
2. Add it to the `children` array in `src/routes/routes.tsx`.
3. Add a nav link in `src/layouts/RootLayout.tsx` if needed.
