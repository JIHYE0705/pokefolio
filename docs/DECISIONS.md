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
