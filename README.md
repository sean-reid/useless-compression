# USELESS COMPRESSION

> a library of one thousand compression formats that should not exist, could not work,
> or simply do not deserve to

A static catalog of absurd compression formats. Some are specifications. Some are
algorithms. A handful, regrettably, can be run in the browser.

## stack

- vite + react + typescript
- tailwind for the visual chaos
- hashrouter (we are on github pages)
- playwright for e2e, vitest for units
- github actions for ci + deploy

## scripts

```sh
pnpm install
pnpm dev          # http://localhost:5173
pnpm test         # vitest unit tests
pnpm e2e          # playwright e2e
pnpm typecheck
pnpm lint
pnpm build
```

## structure

```
src/
  components/   shared ui
  pages/        routed views
  index.css     tailwind + globals
tests/
  e2e/          playwright user-story tests
  setup.ts      vitest setup
.github/
  workflows/    ci + deploy
```

## philosophy

This is a static site. There is no backend. There never will be.
If you find a real bug, that is itself a bug, and it should be filed.
If you find a fake bug, congratulations, that is a feature.
