# Pokefolio Product Direction Redefinition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pokefolio의 제품 및 UX 기획 문서를 카드 관리 중심에서 수집의 순간과 기억을 보존하는 모바일 컬렉션 저널 중심으로 정렬한다.

**Architecture:** `PRODUCT_VISION.md`를 최상위 제품 판단 기준으로 새로 만들고 `PROJECT.md`, `SCREENS.md`, `DESIGN.md`, `ROADMAP.md`가 이를 제품 범위·화면·표현·순서로 구체화한다. `ERD.md`와 `DECISIONS.md`에는 구현을 확정하지 않고 새 방향의 데이터 영향과 제품 결정을 기록하며 기존 기술 계약은 유지한다.

**Tech Stack:** Markdown, Git; 제품 방향이 전제하는 향후 기술은 기존 Next.js App Router, TypeScript, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic v2, SQLite 결정을 유지한다.

## Global Constraints

- 제품 비전과 UX 기획 문서만 수정한다.
- 애플리케이션 코드, Frontend 컴포넌트, Backend 모델, migration, API 구현과 `docs/API.md`는 수정하지 않는다.
- 공식 기록 용어는 `Collection Journal`로 통일한다.
- `Collection Journey`, `Memories`, `Keeper`, `Collection`은 승인된 의미로만 사용한다.
- 구현되지 않은 기능은 현재 기능처럼 표현하지 않는다.
- 기존 기술·아키텍처 결정과 관련 없는 문서 내용을 삭제하지 않는다.
- `image.png`와 `.idea/`는 수정하거나 스테이징하지 않는다.
- 390px 모바일 우선, Apple HIG의 clarity·deference·depth·familiarity·adaptability·accessibility, anti-AI UI와 접근성 원칙을 유지한다.

---

### Task 1: 제품 비전과 MVP 정의

**Files:**
- Create: `docs/PRODUCT_VISION.md`
- Modify: `docs/PROJECT.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-07-17-product-direction-redefinition-design.md`
- Produces: 화면, 디자인, 로드맵 문서가 참조할 제품 정의·MVP 범위·가설·성공 기준

- [ ] **Step 1: 최상위 제품 비전 작성**

  `PRODUCT_VISION.md`를 “Pokefolio는 카드 관리 앱이 아니다.”로 시작한다. 제품 한 문장 정의, 존재 이유, 사용자 문제, 주요 사용자, 설렘·뿌듯함·추억, 제품 원칙, 하지 않는 것, 핵심 경험, Keeper 역할과 금지 행동, “Collect memories, not just cards.”, 제품 판단 기준과 향후 기능 평가 질문을 작성한다.

- [ ] **Step 2: PROJECT를 MVP 실행 정의로 재작성**

  문서 첫 부분에서 `PRODUCT_VISION.md`를 링크한다. 카드 또는 수집 경험 기록에서 Collection, Collection Journal, Binder, Memories, Wishlist, duplicates, Collection Journey, Keeper로 이어지는 사용자 여정을 명시한다. MVP 목표, 최소 기능, 검증 가설, 성공 기준, 제외 범위와 기존 기술 경계를 구분한다.

- [ ] **Step 3: 제품 문서 자체 검증**

  Run:

  ```bash
  test -f docs/PRODUCT_VISION.md
  rg -n "Pokefolio는 카드 관리 앱이 아니다|Collect memories, not just cards|Collection Journal|Keeper" docs/PRODUCT_VISION.md docs/PROJECT.md
  git diff --check -- docs/PRODUCT_VISION.md docs/PROJECT.md
  ```

  Expected: 모든 명령이 exit code 0이며 제품 정의, 슬로건, 공식 용어가 두 문서에 나타난다.

- [ ] **Step 4: 제품 문서 커밋**

  Run:

  ```bash
  git add docs/PRODUCT_VISION.md docs/PROJECT.md
  git commit -m "docs: redefine Pokefolio product vision"
  ```

### Task 2: 핵심 화면과 디자인 원칙

**Files:**
- Modify: `docs/SCREENS.md`
- Modify: `docs/DESIGN.md`

**Interfaces:**
- Consumes: `docs/PRODUCT_VISION.md`, `docs/PROJECT.md`, 승인된 390px·Apple HIG·anti-AI UI 원칙
- Produces: 후속 mock UI와 사용자 흐름이 따라야 할 화면 우선순위와 표현 기준

- [ ] **Step 1: 네 핵심 화면 재정의**

  Home, Collection, Collection Journal, Binder 각각에 감정, 목적, 첫 콘텐츠, 핵심 CTA, 보조 CTA, 금지 정보, loading·empty·error·success와 390px ASCII 와이어프레임을 작성한다. Home 순서는 이어서 꾸밀 바인더, 최근 수집 기억, 최근 카드, 과거의 오늘, Keeper의 관찰, 오늘의 간단한 행동으로 둔다.

- [ ] **Step 2: 보조 화면과 이동 구조 정렬**

  기존 Card Detail, Wishlist, Trade의 유효한 내용을 보존한다. `Opening Log` 화면은 Collection Journal 목록·작성·상세로 확장하고 팩 개봉 외 구매, 방문, 선물, 교환, 여행과 개인적인 기억을 수용한다. 모든 항목을 강제하지 않는 빠른 기록과 자세히 기록하기를 UX 원칙으로 둔다.

- [ ] **Step 3: 디자인 기준 강화**

  `DESIGN.md`에 Content before chrome, Typography and spacing before containers, 카드 이미지 중심, 추억·기록 표현, Keeper 노출, Apple HIG 적용, 따뜻하지만 절제된 표현과 anti-AI UI 금지 기준을 추가한다. Bottom navigation의 기존 `Opening Log` 명칭은 기획상 `Collection Journal`로 바꾸되 현재 mock route가 아직 변경되지 않았음을 명시한다.

- [ ] **Step 4: 화면·디자인 검증 후 커밋**

  Run:

  ```bash
  rg -n "느껴야 하는 감정|첫 번째로 보여야 할 콘텐츠|핵심 CTA|보조 CTA|표시하면 안 되는 정보" docs/SCREENS.md
  rg -n "Content before chrome|Typography and spacing before containers|Keeper|Anti-AI" docs/DESIGN.md
  git diff --check -- docs/SCREENS.md docs/DESIGN.md
  git add docs/SCREENS.md docs/DESIGN.md
  git commit -m "docs: align collection journal experience"
  ```

  Expected: 검증 명령이 exit code 0이고 두 문서만 커밋된다.

### Task 3: 로드맵, 데이터 영향과 제품 결정

**Files:**
- Modify: `docs/ROADMAP.md`
- Modify: `docs/ERD.md`
- Modify: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: 제품 비전, MVP 정의, 화면 명세
- Produces: 사용자 가치 순서의 후속 작업, 구현 전 데이터 Open Questions, 추적 가능한 제품 ADR

- [ ] **Step 1: 로드맵 재정렬**

  제품 비전과 디자인 정렬부터 Trade까지 승인된 10단계로 재작성한다. 각 단계에 사용자 가치, 범위와 검증 가능한 완료 조건을 둔다. 현재 Frontend scaffold와 mock UI는 존재하고 Backend는 문서 단계임을 별도로 표시한다.

- [ ] **Step 2: ERD 영향 검토 기록**

  기존 엔티티와 기술 원칙은 보존한다. `JournalEntry`/`CollectionJournal`, `JournalEntryCard`, Attachment, 기록 유형·장소·기분·한 줄 기록, Binder theme·description·cover card, Memory 저장 여부, UserCard 실물 단위 여부와 Collection 연동 transaction을 “제품 방향 변경에 따른 Open Questions”로 추가한다. 모델과 필드 타입은 확정하지 않는다.

- [ ] **Step 3: 제품 ADR 다섯 개 추가**

  `DECISIONS.md`에 컬렉션 저널 정의, 시세·투자 비핵심화, `Opening Log`의 `Collection Journal` 확장, Keeper 정의, Home의 기억·행동 중심화를 Context·Decision·Consequences 형식으로 추가한다. 기존 ADR-007은 유지하고 Keeper ADR이 이를 구체화한다고 기록한다.

- [ ] **Step 4: 로드맵·ERD·ADR 검증 후 커밋**

  Run:

  ```bash
  rg -n "Collection Journal UX|Collection CRUD|Binder Story|Memories|Rule-based Keeper" docs/ROADMAP.md
  rg -n "JournalEntry|Attachment|theme|Memory|실물 카드" docs/ERD.md
  rg -n "컬렉션 저널|시세|Collection Journal|Keeper|Home" docs/DECISIONS.md
  git diff --check -- docs/ROADMAP.md docs/ERD.md docs/DECISIONS.md
  git add docs/ROADMAP.md docs/ERD.md docs/DECISIONS.md
  git commit -m "docs: record journal product decisions"
  ```

  Expected: 모든 검색과 diff 검증이 exit code 0이고 세 문서만 커밋된다.

### Task 4: 전체 문서 정합성 검증

**Files:**
- Review: `docs/PRODUCT_VISION.md`
- Review: `docs/PROJECT.md`
- Review: `docs/SCREENS.md`
- Review: `docs/DESIGN.md`
- Review: `docs/ROADMAP.md`
- Review: `docs/ERD.md`
- Review: `docs/DECISIONS.md`
- Must remain unmodified: `docs/API.md`, `frontend/**`, `backend/**`

**Interfaces:**
- Consumes: Task 1~3의 문서 결과
- Produces: 용어, 링크, 현재/미래 시제와 변경 범위가 검증된 문서 집합

- [ ] **Step 1: Markdown 내부 링크 검증**

  문서에 추가한 로컬 `.md` 링크를 저장소 기준 실제 파일과 대조한다. 외부 링크나 anchor가 아닌 상대 파일 링크가 빠진 경우만 수정한다.

- [ ] **Step 2: 공식 용어와 구 용어 맥락 검토**

  Run:

  ```bash
  rg -n "Collection Journal|Collection Journey|Memories|Keeper" docs/{PRODUCT_VISION,PROJECT,SCREENS,DESIGN,ROADMAP,ERD,DECISIONS}.md
  rg -n "Opening Log|OpeningLog|개봉일기" docs/{PRODUCT_VISION,PROJECT,SCREENS,DESIGN,ROADMAP,ERD,DECISIONS}.md
  ```

  Expected: 공식 용어가 새 제품 설명에 쓰인다. 구 용어는 이전 초안, 전환 결정, 현재 mock route 또는 ERD 영향 설명에만 남는다.

- [ ] **Step 3: 변경 범위와 whitespace 검증**

  Run:

  ```bash
  git diff main...HEAD --name-only
  git diff main...HEAD --check
  git status --short
  ```

  Expected: 커밋된 변경은 설계·계획 문서와 지정한 일곱 제품 문서뿐이다. `docs/API.md`, `frontend/**`, `backend/**`는 나타나지 않는다. `image.png`와 `.idea/`는 미추적 상태이며 스테이징되지 않는다.

- [ ] **Step 4: 최종 문서 리뷰**

  모든 문서를 처음부터 다시 읽고 다음을 확인한다.

  - 제품 정의가 카드 관리나 투자보다 기억과 수집 여정을 우선한다.
  - Home이 통계 대시보드로 설명되지 않는다.
  - Collection Journal이 팩 개봉 외 다양한 수집 경험을 포함한다.
  - Keeper가 짧고 따뜻한 관찰과 제안만 제공한다.
  - ERD와 API 영향은 구현 확정이 아니라 Open Questions로 표현된다.
  - 다음 작업은 문서 리뷰이며 코드 구현으로 이어지지 않는다.
