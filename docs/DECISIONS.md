# Pokefolio Architecture Decision Records

결정 상태는 `Accepted` 또는 `Deferred`로 표시한다. 변경이 필요하면 기존 기록을 지우지 않고 새 ADR에서 대체 관계를 남긴다.

## ADR-001: Monorepo

- **Status:** Accepted
- **Context:** Frontend, Backend, API 계약과 제품 문서가 같은 MVP를 함께 변경한다.
- **Decision:** `frontend/`, `backend/`, `docs/`, `scripts/`를 한 저장소에서 관리하고 애플리케이션별 dependency와 실행 경계를 유지한다.
- **Consequences:** 계약과 변경을 함께 검토하기 쉽다. 대신 각 영역이 서로의 내부 모듈을 참조하지 않도록 경계를 지켜야 한다.

## ADR-002: Next.js + FastAPI

- **Status:** Accepted
- **Context:** 모바일 우선 웹 UI와 명시적 Python API·데이터 계층이 필요하다.
- **Decision:** Frontend는 Next.js App Router와 TypeScript, Backend는 FastAPI를 사용하고 HTTP/JSON으로만 통신한다.
- **Consequences:** UI와 API를 독립적으로 테스트·배포할 수 있다. 타입을 자동으로 공유하지 않으므로 API 문서와 계약 테스트가 중요하다.

## ADR-003: SQLite for local MVP

- **Status:** Accepted
- **Context:** 로그인 없는 단일 사용자 MVP는 간단한 로컬 저장소로 충분하다.
- **Decision:** 로컬 MVP는 SQLite로 시작하며 DB 파일은 Git에 포함하지 않는다. PostgreSQL 이전을 막는 SQLite 전용 기능과 native SQL은 최소화한다.
- **Consequences:** 설치와 로컬 실험이 단순하다. 운영 동시성·확장성 요구가 생기면 PostgreSQL migration과 동작 차이를 검증해야 한다.

## ADR-004: SQLAlchemy 2.x, Alembic, Pydantic v2

- **Status:** Accepted
- **Context:** 영속성, migration, 외부 계약의 책임을 분리하고 PostgreSQL 이전 가능성을 유지해야 한다.
- **Decision:** SQLAlchemy 2.x typed declarative mapping으로 DB 모델을 작성하고 Alembic으로 migration을 관리한다. API request/response는 별도 Pydantic v2 스키마를 사용한다. SQLModel은 사용하지 않는다.
- **Consequences:** 계층별 책임과 타입이 명확해진다. DB 모델과 API 스키마 사이 매핑 코드가 생기지만 내부 컬럼이 API에 우발적으로 노출되는 위험을 줄인다.

## ADR-005: Docker deferred

- **Status:** Deferred
- **Context:** 초기에는 두 애플리케이션과 SQLite를 로컬에서 빠르게 실행하는 것이 우선이다.
- **Decision:** 로컬 MVP 단계에서는 Docker 설정을 만들지 않는다.
- **Consequences:** 초기 설정이 작고 단순하다. 환경 차이가 실제 문제로 확인되거나 운영 배포 구성이 필요할 때 컨테이너화를 재평가한다.

## ADR-006: Mobile-first web

- **Status:** Accepted
- **Context:** 핵심 사용 시점은 카드 보관 장소, 매장, 개봉 자리 등 모바일 환경이다.
- **Decision:** 390px를 기준으로 웹을 설계하고 넓은 화면으로 점진 확장한다. safe area와 향후 PWA 가능성을 고려하되 PWA를 MVP에 구현하지 않는다.
- **Consequences:** 핵심 행동과 정보 우선순위가 명확해진다. 모든 화면은 확대 텍스트, 키보드, 다양한 viewport에서 별도로 검증해야 한다.

## ADR-007: AI is an assistive feature

- **Status:** Accepted
- **Context:** 제품 핵심은 사용자의 수집과 기록이며 자동 추천이 판단을 대신하면 신뢰와 제품 초점이 흐려질 수 있다.
- **Decision:** AI는 등록, 정리, 발견을 보조하며 핵심 CRUD의 필수 의존성이 되지 않는다. 추천은 먼저 설명 가능한 규칙 기반으로 검증한다.
- **Consequences:** AI 장애나 비용이 기본 컬렉션 경험을 막지 않는다. 고급 기능 도입 전 개인정보, 정확도, 설명 가능성, 비용을 평가해야 한다.

## ADR-008: Single-user MVP without login

- **Status:** Accepted
- **Context:** 초기 가설은 컬렉션 관리 경험이며 인증과 공유는 별도 위험과 범위를 만든다.
- **Decision:** MVP는 로그인 없는 단일 사용자로 운영한다. API와 service에서 암묵적 전역 상태가 퍼지지 않도록 향후 사용자 context 추가 지점을 문서화한다.
- **Consequences:** 핵심 흐름을 빠르게 검증할 수 있다. 다중 사용자 전환 전 소유권 컬럼, 데이터 migration, 인증·권한·개인정보 설계를 완료해야 한다.

## ADR-009: Pokefolio is a collection journal

- **Status:** Accepted
- **Context:** 기존 제품 정의는 수집, 기록, Binder와 교환을 함께 나열해 카드 관리 기능과 사용자가 다시 찾을 감정적 가치의 우선순위가 충분히 선명하지 않았다.
- **Decision:** Pokefolio를 컬렉션 관리 앱이 아니라 카드와 그 카드를 모았던 순간을 함께 기록하고 다시 꺼내보는 모바일 컬렉션 저널로 정의한다. 설렘, 뿌듯함과 추억을 제품의 핵심 감정으로 둔다.
- **Consequences:** Home, Collection, Collection Journal, Binder와 후속 기능은 보유량 관리보다 카드 이미지, 기록과 수집 여정을 먼저 보여줘야 한다. CRUD와 metadata는 이 경험을 지원하는 기반으로 평가한다.

## ADR-010: Price and investment are not core experiences

- **Status:** Accepted
- **Context:** 시세와 수익률은 일부 사용자에게 유용할 수 있지만 전면에 배치하면 기억과 취향보다 자산 가치가 제품의 목적처럼 보인다.
- **Decision:** 시세, 등급과 투자 정보는 MVP와 핵심 navigation, Home 우선순위와 제품 성공 기준에서 제외한다. 향후 제공하더라도 사용자가 요청할 때 확인하는 보조 정보로만 검토한다.
- **Consequences:** 총 가치, 수익률, 구매 권유와 투자 dashboard를 핵심 화면에 만들지 않는다. 후속 제안은 수집의 감정적 가치와 입력 부담을 해치지 않는지 먼저 검증해야 한다.

## ADR-011: Opening Log expands to Collection Journal

- **Status:** Accepted
- **Context:** `Opening Log`는 팩 개봉만 기록하는 기능으로 이해되기 쉬워 낱장 구매, 카드샵·팝업스토어 방문, 선물, 교환, 여행과 개인적인 기억을 포괄하지 못한다.
- **Decision:** 사용자에게 보이는 공식 기록 개념과 용어를 `Collection Journal`로 통일한다. 빠른 기록과 선택적인 자세히 기록하기를 제공하고 모든 항목을 강제하지 않는다.
- **Consequences:** 기존 `OpeningLog`, `OpeningLogCard`, `/opening-logs`와 Frontend mock route는 구현 전 초안으로 남아 있다. 모델, API와 route 이름의 변경 및 호환 정책은 별도 설계에서 결정하며 이번 ADR만으로 구현 계약을 확정하지 않는다.

## ADR-012: Keeper is a quiet collection companion

- **Status:** Accepted
- **Context:** 일반적인 AI 분석이나 추천 상자는 자동화가 제품의 주인공처럼 보이게 하고 사용자의 취향과 감정을 수치로 단정할 위험이 있다.
- **Decision:** Keeper를 컬렉션의 작은 변화, 과거 기록과 카드 사이의 연결을 관찰하고 짧고 따뜻하게 제안하는 동반자로 정의한다. Keeper는 명령, 구매·투자 권유, 긴 분석과 감정 단정을 하지 않으며 핵심 흐름의 필수 의존성이 되지 않는다.
- **Consequences:** Keeper는 관찰 근거가 있을 때만 관련 콘텐츠 안에 나타나고 숨기거나 실패해도 Collection Journal이 동작해야 한다. 이 결정은 ADR-007의 AI 보조 원칙을 제품 언어와 노출 방식으로 구체화한다.

## ADR-013: Home prioritizes memories and next actions

- **Status:** Accepted
- **Context:** 총 카드, 중복, Wishlist와 시세를 같은 크기의 통계로 보여주는 Home은 사용자가 다시 열 이유를 관리 지표로 축소하고 모바일 SaaS dashboard처럼 보이게 한다.
- **Decision:** Home은 이어서 꾸밀 Binder, 최근 수집 기억, 최근 추가 카드, 과거의 오늘, Keeper가 발견한 변화와 오늘 할 수 있는 한 가지 행동을 우선한다.
- **Consequences:** 통계와 복잡한 graph는 첫 화면 중심에서 제외하고 primary CTA를 하나로 제한한다. 콘텐츠가 부족할 때는 빈 통계 tile 대신 첫 Collection Journal 또는 Binder 행동을 안내한다.
