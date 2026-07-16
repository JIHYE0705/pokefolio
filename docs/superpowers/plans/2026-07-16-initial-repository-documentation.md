# Pokefolio Initial Repository Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 애플리케이션 코드 없이 Pokefolio의 제품, UX, 데이터, API, 개발 및 테스트 기준을 설명하는 초기 저장소 구조와 문서를 완성한다.

**Architecture:** 기존 모노레포 경계를 유지하고 문서를 제품·디자인·데이터/API·개발 규칙으로 분리한다. 모든 문서는 현재가 구현 전 단계임을 명시하며 서로 상대 링크로 연결한다.

**Tech Stack:** Markdown, Git; 향후 기술 방향은 Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic v2, SQLite이다.

## Global Constraints

- Next.js, FastAPI 또는 기타 애플리케이션 코드를 생성하지 않는다.
- `package.json`, `pyproject.toml`, 데이터베이스, 의존성, Docker 설정을 생성하지 않는다.
- 390px 모바일 우선, Apple HIG, 카드 이미지 중심, 접근성 원칙을 문서화한다.
- SQLAlchemy 2.x typed declarative mapping, Alembic, Pydantic v2를 확정하고 SQLModel은 사용하지 않는다.
- DB 모델과 API 스키마를 분리하며 SQLite 전용 기능과 native SQL을 최소화한다.
- 기존 문서의 유효한 내용을 보존하고 요청 범위 밖의 추상화나 기능을 추가하지 않는다.

---

### Task 1: 저장소 안내와 작업 규칙

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Create: `scripts/.gitkeep`

**Interfaces:**
- Consumes: 승인된 설계 명세와 현재 저장소 구조
- Produces: 모든 후속 작업이 참조하는 저장소 색인과 에이전트 규칙

- [ ] **Step 1: README를 현재 단계에 맞게 확장**

  프로젝트 한 줄 설명, 핵심 경험, 기술 방향, 전체 저장소 트리, 구현 전 상태, 10개 핵심 문서 링크를 작성한다. 계획된 기능을 완료된 기능으로 표현하지 않는다.

- [ ] **Step 2: AGENTS 규칙을 요구사항과 일치시킴**

  작업 전 관련 문서 확인, 작은 단위 작업, 범위 통제, dependency 설명, 리팩터링 분리, 390px 검수, 화면 상태, 실제 검증, 오류 보고, 비밀정보·DB·빌드 산출물 금지, 완료 보고 형식을 명시한다.

- [ ] **Step 3: scripts 디렉터리 유지 파일 추가**

  빈 `scripts/.gitkeep`만 추가하고 스크립트 구현은 하지 않는다.

- [ ] **Step 4: 구조와 링크 검증**

  Run: `test -f README.md && test -f AGENTS.md && test -f scripts/.gitkeep && git diff --check`

  Expected: exit code 0.

- [ ] **Step 5: 커밋**

  Run: `git add README.md AGENTS.md scripts/.gitkeep && git commit -m "docs: expand repository guidance"`

### Task 2: 제품, 로드맵, 모바일 디자인 및 화면

**Files:**
- Modify: `docs/PROJECT.md`
- Modify: `docs/ROADMAP.md`
- Create: `docs/DESIGN.md`
- Create: `docs/SCREENS.md`

**Interfaces:**
- Consumes: README의 제품 설명, Apple HIG 참고 원칙, 390px 기준
- Produces: 데이터·API·테스트 문서가 참조할 MVP 범위와 사용자 흐름

- [ ] **Step 1: 제품 정의 확장**

  제품 비전, 문제, 주요 사용자, 가치, 핵심 흐름, MVP 포함·제외, 향후 확장, 측정 가능한 성공 기준을 작성한다.

- [ ] **Step 2: Phase 0~8 로드맵 재구성**

  각 Phase에 목표, 작업, 완료 조건을 두고 scaffold, Mock UI, Collection, Binder, Opening Log, 규칙 기반 추천, OCR, Trade 순서를 명시한다.

- [ ] **Step 3: 디자인 원칙 작성**

  브랜드, Apple HIG, 역할 기반 provisional 색상 토큰, 타이포그래피, spacing·radius·shadow, 카드 이미지 비율, 하단 내비게이션, 핵심 컴포넌트, 상태, safe area, 접근성, 금지 패턴을 작성한다.

- [ ] **Step 4: 10개 화면 명세 작성**

  Home, Collection, Card Detail, Binder List, Binder Detail, Opening Log List/Create/Detail, Wishlist, Trade Coming Soon 각각에 목적, 구성, 핵심 액션, loading·empty·error·success, 이동 흐름, 390px ASCII 와이어프레임을 작성한다.

- [ ] **Step 5: 문서 형식 검증 후 커밋**

  Run: `git diff --check && test -f docs/DESIGN.md && test -f docs/SCREENS.md`

  Expected: exit code 0.

  Run: `git add docs/PROJECT.md docs/ROADMAP.md docs/DESIGN.md docs/SCREENS.md && git commit -m "docs: define product and mobile experience"`

### Task 3: 데이터 모델과 API 계약 초안

**Files:**
- Create: `docs/ERD.md`
- Create: `docs/API.md`
- Create: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: PROJECT의 MVP 범위와 SCREENS의 사용자 행동
- Produces: 향후 backend scaffold와 frontend API client가 공유할 초안 계약

- [ ] **Step 1: ERD 후보 작성**

  Card, UserCard, WishlistItem, Binder, BinderPage, BinderSlot, OpeningLog, OpeningLogCard의 필드 후보, 관계, unique constraint, index, 삭제 정책, 미결정 사항을 표와 Mermaid 관계도로 작성한다.

- [ ] **Step 2: API 초안 작성**

  health, cards, user cards, wishlist, binders, binder pages/slots, opening logs의 method, path, 목적, JSON 요청·응답, 400·404·409·422·500 오류 envelope를 작성한다. 모든 예시는 구현 전 초안임을 밝힌다.

- [ ] **Step 3: ADR 작성**

  Monorepo, Next.js + FastAPI, SQLite local MVP, Docker deferred, mobile-first web, AI 보조 기능, 로그인 없는 단일 사용자 MVP, SQLAlchemy 2.x + Alembic + Pydantic v2 결정을 Context·Decision·Consequences 형식으로 기록한다.

- [ ] **Step 4: 기술 결정 일관성 검증 후 커밋**

  Run: `rg -n "SQLAlchemy 2.x|Alembic|Pydantic v2|SQLModel" docs/{ERD,API,DECISIONS}.md && git diff --check`

  Expected: 확정 기술과 SQLModel 미사용 원칙이 나타나고 exit code 0.

  Run: `git add docs/ERD.md docs/API.md docs/DECISIONS.md && git commit -m "docs: draft data and API contracts"`

### Task 4: 코딩, 테스트, 프롬프트 기준과 최종 검증

**Files:**
- Create: `docs/CODING_RULES.md`
- Create: `docs/TESTING.md`
- Create: `docs/PROMPTS.md`

**Interfaces:**
- Consumes: 확정 기술 결정, API/ERD 초안, AGENTS 규칙
- Produces: 후속 scaffold와 기능 작업의 실행 기준

- [ ] **Step 1: 프런트엔드·백엔드 코딩 규칙 작성**

  TypeScript strict, `any` 금지, Server Component 우선, 최소 Client Component, API 호출 경계, 컴포넌트 책임, 접근성과 Python type hints, Pydantic validation, router/service/repository 경계, SQLAlchemy·Alembic·SQLite 호환성, 예외 처리, 테스트 가능성을 분리해 작성한다.

- [ ] **Step 2: 테스트 전략 작성**

  frontend unit/component/e2e, backend unit/API/integration 범위, MVP 최소 테스트, scaffold 이후 확정할 명령 형태, 완료 기준을 작성한다. 아직 존재하지 않는 명령을 실행 가능하다고 표현하지 않는다.

- [ ] **Step 3: Codex 프롬프트 템플릿 작성**

  새 기능, UI, API, 버그 수정, 코드 리뷰, 리팩터링, 테스트 추가 템플릿에 목표·범위·참고 문서·제약·검증·완료 보고 입력란을 제공한다.

- [ ] **Step 4: 전체 Markdown 링크와 요구 파일 검증**

  Run: `for file in README.md AGENTS.md docs/{PROJECT,ROADMAP,DESIGN,SCREENS,ERD,API,CODING_RULES,TESTING,DECISIONS,PROMPTS}.md scripts/.gitkeep; do test -f "$file" || exit 1; done`

  Expected: exit code 0.

  Run: `find . -path './.git' -prune -o -path './.worktrees' -prune -o \( -name package.json -o -name pyproject.toml -o -name '*.db' -o -name '*.sqlite' -o -name '*.sqlite3' \) -print`

  Expected: no output.

  Run: `git diff --check`

  Expected: exit code 0.

- [ ] **Step 5: code-review 기준 자체 검토 및 커밋**

  변경 범위, 문서 링크, 기술 결정, 모바일 접근성, API/ERD 정합성, 구현 전 상태 표현을 검토하고 발견된 문제를 수정한다.

  Run: `git add docs/CODING_RULES.md docs/TESTING.md docs/PROMPTS.md && git commit -m "docs: define development workflows"`
