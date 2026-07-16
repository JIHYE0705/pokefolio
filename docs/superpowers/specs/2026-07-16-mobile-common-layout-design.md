# Pokefolio 모바일 공통 레이아웃 설계

## 목적

실행 가능한 최소 Next.js frontend를 구성하고, 390px 모바일 화면에서 모든 주요 mock 페이지가 공유하는 App Bar, 콘텐츠 영역, Bottom Navigation, theme, typography, spacing과 데이터 상태 컴포넌트를 구현한다. API와 backend는 연결하지 않는다.

## 범위

### 포함

- Next.js App Router, TypeScript strict, Tailwind CSS v4, ESLint 최소 scaffold
- Vitest와 Testing Library 기반 최소 component test 환경
- Home, Collection, Binder, Opening Log mock route
- App Bar, Bottom Navigation, 공통 page shell
- semantic theme token, typography, spacing, radius, shadow
- Loading, Empty, Error 공통 상태
- 390px 및 768px 이상 responsive 검증
- safe area, keyboard, focus, touch target, text scaling, reduced motion 대응

### 제외

- API 호출, `fetch`, backend 연결
- 실제 카드 데이터와 사용자 입력 저장
- shadcn/ui component 설치 또는 생성
- 이미지 생성과 공식 포켓몬 자산
- 상태 관리·data fetching library
- PWA, 인증, 다크 모드, animation framework

## Scaffold 결정

기존 `frontend/`에는 `.gitkeep`만 있으므로 수동 최소 scaffold를 사용한다. 생성기 전체 예제를 복사하지 않고 다음 dependency만 둔다.

- Runtime: `next`, `react`, `react-dom`
- Styling/build: `tailwindcss`, `@tailwindcss/postcss`, `postcss`
- Type/lint: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`
- Test: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`

아이콘 library는 추가하지 않고 네 개의 단순한 inline SVG를 한 공통 icon component에서 제공한다. shadcn/ui는 실제 primitive가 필요한 후속 화면 작업까지 미룬다.

## Route와 레이아웃

```text
frontend/app/
├── layout.tsx                 # html, body, metadata, globals
└── (app)/
    ├── layout.tsx             # AppShell
    ├── page.tsx               # /
    ├── collection/page.tsx    # /collection
    ├── binders/page.tsx       # /binders
    └── opening-logs/page.tsx  # /opening-logs
```

`(app)/layout.tsx`가 공통 shell을 소유한다. route page는 mock 콘텐츠만 제공하며 App Bar나 navigation을 반복하지 않는다. App Router의 `Link`를 사용해 페이지를 전환한다.

## 컴포넌트 경계

| 컴포넌트 | 책임 | 렌더링 경계 |
| --- | --- | --- |
| `AppShell` | skip link, App Bar, main, Bottom Navigation 조립 | Server Component |
| `AppBar` | Pokefolio 제목과 보조 설명 | Server Component |
| `BottomNavigation` | 네 route 링크와 현재 route 표시 | 최소 Client Component |
| `NavigationIcon` | 내부 SVG icon 선택 | Bottom Navigation 내부 |
| `LoadingState` | 진행 상태와 skeleton 구조 | Server-compatible |
| `EmptyState` | 빈 상태 설명과 선택적 Link 행동 | Server-compatible |
| `ErrorState` | 오류 설명과 복구 Link 행동 | Server-compatible |

`BottomNavigation`만 `usePathname()` 때문에 `use client`를 사용한다. 상태 컴포넌트는 callback prop 대신 선택적 `href`와 link label을 받아 Client Component 확산을 피한다.

## 시각 체계

`globals.css`에 semantic CSS variable을 정의하고 Tailwind arbitrary value 또는 공통 class에서 사용한다.

- Canvas: 밝은 중성 배경
- Surface: 흰색 카드와 App Bar
- Accent: primary action, current navigation, focus에만 쓰는 절제된 보라색
- Text: primary, secondary, muted 역할 분리
- Feedback: danger와 success는 icon·문구와 함께 사용
- Spacing: 4px 기반 `4, 8, 12, 16, 24, 32`
- Radius: `8, 12, 16, 24`
- Shadow: surface 구분이 필요할 때만 낮은 대비로 사용
- Typography: 시스템 sans-serif, body 16~17px 후보, 가벼운 weight 금지

token 값은 현재 `docs/DESIGN.md`의 provisional 후보를 구현 검증용으로 사용하며 최종 브랜드 값으로 확정하지 않는다.

## 390px 레이아웃

- body canvas 안에 최대 폭 768px의 앱 surface를 중앙 배치한다.
- App Bar는 상단 safe area를 포함하고 콘텐츠 스크롤과 함께 유지되는 sticky header다.
- Bottom Navigation은 viewport 하단에 fixed로 두고 `safe-area-inset-bottom`을 포함한다.
- main은 좌우 16px 후보와 Bottom Navigation 높이 이상의 padding을 갖는다.
- 390px에서 page-level 가로 스크롤을 허용하지 않는다.
- 768px 이상에서도 같은 정보 순서를 유지하며 여백만 확장한다.

## 접근성

- `header`, `main`, `nav`와 heading 순서를 사용한다.
- 첫 focus 대상으로 main content skip link를 제공한다.
- navigation link는 최소 44×44 CSS px이고 text label을 항상 표시한다.
- 현재 route는 `aria-current="page"`, accent, icon container 형태로 함께 표시한다.
- focus ring은 배경과 구분되는 2px 이상 outline을 사용한다.
- 상태는 icon, 제목, 설명을 함께 사용하고 색상에만 의존하지 않는다.
- Loading은 `role="status"`와 readable label을 제공한다.
- skeleton pulse는 `prefers-reduced-motion`에서 중지한다.
- 200% 확대 시 navigation과 상태 행동이 잘리지 않도록 wrapping과 content-driven height를 사용한다.

## Mock 페이지

- Home: 컬렉션 요약과 최근 활동 mock card
- Collection: 카드 이미지 대신 비브랜드 placeholder art를 사용한 mock grid
- Binder: 3×3 slot preview mock
- Opening Log: 날짜, 세트명, 획득 수량 mock list

Mock 값은 각 page 파일의 읽기 전용 배열로 둔다. 공통 domain abstraction이나 data layer는 만들지 않는다.

## 상태 동작

- Loading: 예상 콘텐츠 높이를 보존하는 skeleton과 "불러오는 중" status
- Empty: 제목, 설명, 가장 관련 있는 다음 route link 하나
- Error: 쉬운 오류 설명과 안전한 route link 기반 복구 행동
- Success: 각 mock page의 정상 콘텐츠

이번 범위에는 실제 비동기 data source가 없으므로 route별 loading/error 전환 로직을 가장하지 않는다. 공통 상태 컴포넌트는 component test로 검증하고 정상 mock page에 거짓 loading이나 error를 표시하지 않는다.

## TDD와 검증

1. 상태 컴포넌트의 role, 제목, action link test를 먼저 작성하고 feature 부재로 실패하는지 확인한다.
2. Bottom Navigation의 네 링크와 current route semantic test를 먼저 작성하고 실패를 확인한다.
3. 최소 컴포넌트를 구현해 test를 통과시킨다.
4. mock route와 styling을 구현한다.
5. 다음 명령을 각각 실행한다.

```bash
cd frontend
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

6. 가능한 경우 browser에서 390px과 768px을 열어 overflow, safe area, focus, text scaling, reduced motion을 검수한다. browser 검증이 불가능하면 통과로 간주하지 않고 미검증으로 보고한다.

## 완료 조건

- 네 route가 App Router Link로 전환되고 동일한 App Bar와 Bottom Navigation을 사용한다.
- 현재 route가 시각·semantic으로 식별된다.
- semantic theme, typography, spacing이 공통 CSS에서 관리된다.
- Loading, Empty, Error가 접근 가능한 공통 컴포넌트로 존재한다.
- API 호출과 backend dependency가 없다.
- lint, typecheck, test, build가 모두 실제로 통과한다.
- 390px과 접근성 검수 결과 및 남은 미검증 항목이 완료 보고에 포함된다.
