# Pokefolio Mobile Common Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 실행 가능한 최소 Next.js frontend와 390px 모바일 공통 App Bar, Bottom Navigation, theme, mock pages, 접근 가능한 loading/empty/error 상태를 구현한다.

**Architecture:** App Router route group layout이 server-rendered AppShell을 공유하고, 현재 route를 읽는 BottomNavigation만 Client Component로 둔다. API나 data layer 없이 각 page가 읽기 전용 mock 데이터를 소유하며 CSS semantic token과 Tailwind v4 utility로 스타일링한다.

**Tech Stack:** Next.js App Router, React, TypeScript strict, Tailwind CSS v4, ESLint, Vitest, Testing Library, jsdom, npm.

## Global Constraints

- API, backend, fetch, data fetching library를 추가하지 않는다.
- shadcn/ui와 icon dependency를 추가하지 않는다.
- 390px mobile first, safe area, 44px touch target, keyboard, focus, text scaling, reduced motion을 지원한다.
- Server Component를 기본으로 하고 `use client`는 `BottomNavigation`에만 사용한다.
- 공통 상태와 navigation behavior는 production code 전에 실패 test를 확인한다.
- 사용자가 승인한 빈 `package-lock.json`은 npm install 결과로 재생성한다.

---

### Task 1: 최소 Next.js scaffold

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/package-lock.json` via npm
- Create: `frontend/tsconfig.json`
- Create: `frontend/next-env.d.ts`
- Create: `frontend/next.config.ts`
- Create: `frontend/postcss.config.mjs`
- Create: `frontend/eslint.config.mjs`
- Create: `frontend/vitest.config.ts`
- Create: `frontend/tests/setup.ts`
- Create: `frontend/app/layout.tsx`
- Create: `frontend/app/globals.css`
- Delete: tracked `.gitkeep` files only where real files replace them

**Interfaces:**
- Produces: `npm run dev`, `lint`, `typecheck`, `test`, `build` scripts and `@/*` alias

- [ ] **Step 1: package manifest와 config 작성**

  Scripts:

  ```json
  {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  }
  ```

  TypeScript는 `strict: true`, alias는 `@/*`, Vitest environment는 `jsdom`, setup은 `tests/setup.ts`로 구성한다.

- [ ] **Step 2: 최소 dependency 설치**

  Run:

  ```bash
  cd frontend
  npm install next react react-dom
  npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next vitest jsdom @testing-library/react @testing-library/jest-dom
  ```

  Expected: install exit code 0, dependency가 있는 lockfile 생성.

- [ ] **Step 3: baseline 검증**

  Run: `cd frontend && npm run typecheck && npm run lint`

  Expected: exit code 0.

### Task 2: 상태 컴포넌트 TDD

**Files:**
- Create first: `frontend/tests/state-view.test.tsx`
- Create after RED: `frontend/components/states/state-view.tsx`

**Interfaces:**
- Produces: `LoadingState`, `EmptyState`, `ErrorState`
- Props: title/description plus optional `actionHref` and `actionLabel` for empty/error

- [ ] **Step 1: 상태 behavior test 작성**

  다음을 각각 검증한다.

  ```tsx
  expect(screen.getByRole("status", { name: "컬렉션 불러오는 중" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "아직 카드가 없어요" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "컬렉션 보기" })).toHaveAttribute("href", "/collection")
  expect(screen.getByRole("alert")).toHaveTextContent("다시 불러오지 못했어요")
  ```

- [ ] **Step 2: RED 확인**

  Run: `cd frontend && npm test -- --run tests/state-view.test.tsx`

  Expected: FAIL because `@/components/states/state-view` does not exist.

- [ ] **Step 3: 최소 구현**

  semantic status/alert, heading, description과 선택적 Next.js Link를 제공한다. Loading skeleton은 `aria-hidden`으로 둔다.

- [ ] **Step 4: GREEN 확인**

  Run: `cd frontend && npm test -- --run tests/state-view.test.tsx`

  Expected: all state tests PASS.

### Task 3: Bottom Navigation과 AppShell TDD

**Files:**
- Create first: `frontend/tests/bottom-navigation.test.tsx`
- Create after RED: `frontend/components/layout/navigation-icon.tsx`
- Create after RED: `frontend/components/layout/bottom-navigation.tsx`
- Create after RED: `frontend/components/layout/app-bar.tsx`
- Create after RED: `frontend/components/layout/app-shell.tsx`
- Create after RED: `frontend/app/(app)/layout.tsx`

**Interfaces:**
- `BottomNavigation` consumes `usePathname()` and produces four accessible route Links.
- `AppShell` consumes `children: ReactNode` and produces skip link, header, main, nav.

- [ ] **Step 1: navigation behavior test 작성**

  `next/navigation`의 pathname만 mock하고 다음을 검증한다.

  ```tsx
  expect(screen.getAllByRole("link")).toHaveLength(4)
  expect(screen.getByRole("link", { name: "컬렉션" })).toHaveAttribute("aria-current", "page")
  expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument()
  ```

- [ ] **Step 2: RED 확인**

  Run: `cd frontend && npm test -- --run tests/bottom-navigation.test.tsx`

  Expected: FAIL because layout components do not exist.

- [ ] **Step 3: 최소 구현**

  Home `/`, Collection `/collection`, Binder `/binders`, Opening Log `/opening-logs` 링크와 inline SVG icon을 구현한다. `aria-current`, text label, 44px target, focus style를 제공한다.

- [ ] **Step 4: GREEN 확인**

  Run: `cd frontend && npm test -- --run tests/bottom-navigation.test.tsx`

  Expected: navigation tests PASS, state tests remain PASS.

### Task 4: Theme와 mock pages

**Files:**
- Create: `frontend/app/(app)/page.tsx`
- Create: `frontend/app/(app)/collection/page.tsx`
- Create: `frontend/app/(app)/binders/page.tsx`
- Create: `frontend/app/(app)/opening-logs/page.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Each page is a Server Component with local readonly mock data.
- Pages consume only common layout/state components; no API contract is introduced.

- [ ] **Step 1: semantic theme와 responsive shell styling**

  CSS variables for canvas/surface/text/accent/border/feedback, system font stack, 4px spacing scale, radius, subtle shadow, safe area, focus-visible, reduced-motion을 작성한다.

- [ ] **Step 2: four success mock pages 작성**

  Home summary/activity, Collection non-branded card placeholder grid, Binder 3×3 slot preview, Opening Log list를 구현한다.

- [ ] **Step 3: 상태 preview 추가**

  Home 하단에 Loading, Empty, Error components를 실제 layout 안에서 확인할 수 있는 preview section을 둔다.

- [ ] **Step 4: test와 정적 검증**

  Run: `cd frontend && npm test -- --run && npm run typecheck && npm run lint`

  Expected: all exit code 0.

### Task 5: Build, browser, review

**Files:**
- Modify only files needed to fix verified issues

**Interfaces:**
- Produces: verified build and completion evidence

- [ ] **Step 1: production build**

  Run: `cd frontend && npm run build`

  Expected: exit code 0 and four routes generated.

- [ ] **Step 2: browser verification**

  Start `npm run dev` and inspect all routes at 390px and at least one route at 768px. Check overflow, sticky/fixed areas, focus, navigation, status semantics, 200% text scaling, reduced motion.

- [ ] **Step 3: final commands**

  Run:

  ```bash
  cd frontend
  npm run lint
  npm run typecheck
  npm test -- --run
  npm run build
  ```

  Expected: all exit code 0.

- [ ] **Step 4: code-review and Git review**

  Review scope, Client Component boundary, accessibility, 390px layout, dependency minimality, tests, `git diff --check`, and `git status`.
