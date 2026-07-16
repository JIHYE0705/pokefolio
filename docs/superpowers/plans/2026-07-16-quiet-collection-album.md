# Quiet Collection Album Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 모바일 공통 레이아웃을 카드 이미지와 기록 중심의 조용한 Pokefolio 수집 앨범으로 리팩터링한다.

**Architecture:** 기존 App Router 페이지, 컴포넌트 인터페이스, mock 배열을 그대로 두고 JSX class 조합과 `globals.css` 표현만 단순화한다. 공통 셸과 상태 컴포넌트의 의미 구조는 기존 Vitest 테스트로 보호하고, 화면별 시각 결과는 390px 브라우저 검수로 확인한다.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, CSS, Vitest

## Global Constraints

- 기능, 라우팅, 데이터 구조를 변경하지 않는다.
- 새로운 디자인 라이브러리와 dependency를 추가하지 않는다.
- 390px Mobile First, safe area, 44px touch target, reduced motion을 유지한다.
- 보라색은 선택 상태, 핵심 CTA, 작은 강조에만 사용한다.
- gradient와 glow를 사용하지 않는다.

---

### Task 1: Common shell and state simplification

**Files:**
- Modify: `frontend/components/layout/app-bar.tsx`
- Modify: `frontend/components/layout/bottom-navigation.tsx`
- Modify: `frontend/components/states/state-view.tsx`
- Modify: `frontend/app/globals.css`
- Test: `frontend/tests/bottom-navigation.test.tsx`
- Test: `frontend/tests/state-view.test.tsx`

**Interfaces:**
- Consumes: 기존 `AppBar`, `BottomNavigation`, `LoadingState`, `EmptyState`, `ErrorState` props
- Produces: 동일한 exported component와 접근성 역할

- [ ] **Step 1: Run existing component tests**

  Run: `npm test -- --run`
  Expected: 기존 내비게이션과 상태 테스트가 PASS한다.

- [ ] **Step 2: Simplify shared markup and CSS**

  영문 eyebrow와 선택 pill을 제거하고, 상태 화면을 border 없는 콘텐츠 블록과 표준 radius CTA로 바꾼다. exported interface와 ARIA 역할은 유지한다.

- [ ] **Step 3: Run component tests**

  Run: `npm test -- --run`
  Expected: 모든 테스트가 PASS한다.

### Task 2: Content-first screen composition

**Files:**
- Modify: `frontend/app/(app)/page.tsx`
- Modify: `frontend/app/(app)/collection/page.tsx`
- Modify: `frontend/app/(app)/binders/page.tsx`
- Modify: `frontend/app/(app)/opening-logs/page.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: 기존 route와 각 파일의 readonly mock 배열
- Produces: 동일 route output과 동일 mock 값

- [ ] **Step 1: Replace repeated surface cards**

  Home 통계를 텍스트 행으로, 활동과 개봉 기록을 구분선 목록으로 바꾸고 중첩 `surface-card` class 사용을 제거한다.

- [ ] **Step 2: Make collection and binder imagery dominant**

  컬렉션 placeholder의 원형 장식과 shadow를 제거하고 바인더 외부 카드 대신 3×3 페이지 자체가 시각적 중심이 되도록 CSS를 수정한다.

- [ ] **Step 3: Run regression tests**

  Run: `npm test -- --run`
  Expected: 모든 테스트가 PASS한다.

### Task 3: Visual and build verification

**Files:**
- Review: `frontend/app/globals.css`
- Review: `frontend/app/(app)/**/page.tsx`

**Interfaces:**
- Consumes: 네 개 route의 정적 render 결과
- Produces: 390px 검수 결과와 검증 로그

- [ ] **Step 1: Inspect routes at 390px and 768px**

  `/`, `/collection`, `/binders`, `/opening-logs`에서 clipping, safe area, touch target, active navigation, visual hierarchy를 확인하고 가능하면 스크린샷을 생성한다.

- [ ] **Step 2: Run static checks and tests**

  Run: `npm run lint && npm run typecheck && npm test -- --run`
  Expected: exit code 0이며 error와 warning이 없다.

- [ ] **Step 3: Run production build**

  Run: `npm run build`
  Expected: 네 route가 정상적으로 생성되고 exit code 0이다.

- [ ] **Step 4: Review final diff**

  Run: `git diff --check && git status --short`
  Expected: whitespace 오류가 없고 변경 파일이 계획 범위에 한정된다.
