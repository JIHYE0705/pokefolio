# Pokefolio 코딩 규칙

이 문서는 애플리케이션 scaffold 이후 적용할 구현 규칙이다. 현재 저장소에는 아직 애플리케이션 코드와 dependency가 없다.

## 공통 원칙

- 요청된 범위와 가장 작은 변경으로 문제를 해결한다.
- 반복이 실제로 확인되기 전에는 추상화, wrapper, 범용 설정을 만들지 않는다.
- 기능 구현과 대규모 리팩터링을 분리한다.
- 외부 입력은 신뢰 경계에서 검증하고 오류는 복구 가능한 형태로 전달한다.
- 새 dependency는 표준 기능과 기존 dependency로 해결할 수 없는 이유를 기록한 뒤 추가한다.
- 공개 계약, 사용자 흐름, 데이터 구조가 바뀌면 관련 문서와 테스트를 함께 갱신한다.

## Frontend

### TypeScript

- `strict: true`를 유지한다.
- 명시적 `any`와 `as any`를 금지한다. 불명확한 외부 값은 `unknown`으로 받고 검증해 좁힌다.
- API 응답을 신뢰하지 않고 합의된 경계에서 parsing 또는 validation한다.
- 의미 있는 domain type을 사용하되 단일 사용처를 위한 불필요한 generic과 wrapper type은 만들지 않는다.
- non-null assertion은 불변 조건을 코드와 테스트로 증명할 수 있을 때만 사용한다.

### Next.js App Router

- Server Component를 기본으로 한다.
- `use client`는 상태, event, browser API가 필요한 가장 작은 컴포넌트에만 선언한다.
- server-only 데이터 접근이나 secret이 Client Component bundle로 넘어가지 않게 한다.
- route segment의 `loading`, `error`, `not-found` 경계는 화면 상태 문서와 일치시킨다.
- mutation 후 revalidation과 사용자 피드백의 책임 위치를 명확히 한다.

### API 호출

- 서버 데이터 호출은 합의된 `frontend/lib/` API client 경계로 통일한다.
- React 컴포넌트에서 base URL, header, 오류 parsing을 반복하지 않는다.
- API client는 backend 내부 모델을 import하지 않고 HTTP 계약 타입만 사용한다.
- timeout, abort, 오류 envelope 변환을 한 경계에서 처리하되 실제 필요 전 재시도 framework는 추가하지 않는다.

### 컴포넌트 책임

- `components/`는 여러 domain에서 재사용하는 표현 UI를 둔다.
- `features/`는 Collection, Binder, Opening Log처럼 domain별 UI와 상호작용을 둔다.
- route component는 페이지 조립과 데이터 경계를 담당하고 큰 business logic을 포함하지 않는다.
- 하나의 컴포넌트가 data fetch, 복잡한 변환, 여러 독립 상호작용을 모두 맡으면 책임을 나눈다.
- shadcn/ui primitive가 의미와 동작을 충족하면 재사용하고 같은 primitive를 복제하지 않는다.

### Styling과 모바일

- Tailwind CSS는 mobile-first utility 순서로 작성한다.
- 390px에서 먼저 검수하고 768px 이상은 콘텐츠 우선순위를 유지하며 확장한다.
- fixed width/height보다 intrinsic size, wrapping, fluid grid, `minmax()`를 선호한다.
- 역할 기반 token을 사용하고 임의 색상·radius·shadow를 컴포넌트마다 추가하지 않는다.
- 카드 이미지는 원본 비율을 유지하고 핵심 artwork를 control로 가리지 않는다.

### 접근성

- semantic HTML과 native element를 ARIA와 custom control보다 먼저 사용한다.
- 모든 행동은 키보드로 가능하고 가시적 포커스와 논리적 순서를 유지한다.
- icon-only action에는 accessible name을 제공한다.
- form label과 오류를 프로그램적으로 연결하고 제출 실패 시 입력을 보존한다.
- 상태를 색상에만 의존하지 않고 텍스트, 아이콘, 모양을 함께 사용한다.
- 44×44 CSS px 수준의 터치 영역, safe area, 확대 텍스트, `prefers-reduced-motion`을 검증한다.

## Backend

### Python과 타입

- 공개 함수, service, repository, schema에 Python type hint를 작성한다.
- `Any`는 외부 library 경계처럼 불가피한 곳에만 제한하고 좁히는 이유를 남긴다.
- domain 의미가 없는 dict 전달보다 명시적인 Pydantic schema 또는 작은 typed value를 사용한다.
- 동기·비동기 방식을 계층별로 섞지 않고 선택한 DB driver와 일관되게 유지한다.

### Pydantic v2 validation

- request, response, query 입력을 명시적 Pydantic v2 schema로 검증한다.
- DB 모델을 response schema로 직접 사용하지 않는다.
- 문자열 길이, 수량 범위, 날짜, enum 후보를 입력 경계에서 검증한다.
- 사용자에게 노출할 수 없는 내부 exception과 값을 validation message에 포함하지 않는다.

### FastAPI 책임

- `api/` router: path, status code, dependency, request/response 변환과 HTTP exception mapping.
- `services/`: transaction 경계와 business rule.
- `repositories/`: SQLAlchemy query와 persistence.
- `models/`: SQLAlchemy 2.x typed declarative DB 모델.
- `schemas/`: Pydantic v2 요청·응답 모델.
- `db/`: engine, session, migration 연결 기반.
- router에 SQL query나 핵심 business rule을 작성하지 않는다.

### SQLAlchemy와 migration

- SQLAlchemy 2.x `Mapped`와 `mapped_column` 기반 typed declarative mapping을 사용한다.
- SQLModel은 사용하지 않는다.
- session은 request 또는 명시적 unit-of-work 범위에서 관리하고 commit/rollback 책임을 service transaction에 둔다.
- schema 변경은 Alembic revision으로 남기고 개발 DB 수동 변경을 기준으로 삼지 않는다.
- migration은 upgrade와 가능한 downgrade를 검토하고 빈 DB와 기존 fixture DB 경로를 테스트한다.

### SQLite 호환성과 PostgreSQL 이전

- 표준 SQLAlchemy expression을 우선하고 native SQL은 측정된 필요가 있을 때만 사용한다.
- SQLite에만 존재하는 함수, 느슨한 typing, 암묵적 boolean/date 동작에 의존하지 않는다.
- foreign key enforcement를 연결 설정에서 명시하고 테스트한다.
- case sensitivity, NULL ordering, transaction/locking 차이를 계약으로 단정하지 않는다.
- enum과 JSON 등 DB별 동작 차이가 큰 타입은 migration 전략을 먼저 기록한다.

### 예외 처리

- repository의 DB exception을 API에 직접 노출하지 않는다.
- service는 not found, conflict, validation 가능한 domain error를 구분한다.
- router는 domain error를 [API 오류 계약](API.md#오류-응답)에 맞게 변환한다.
- 예상하지 못한 오류는 request ID와 함께 server log에 남기고 응답에는 내부 상세를 숨긴다.
- data loss 가능성이 있는 multi-step 변경은 transaction으로 원자성을 유지한다.

### 테스트 가능성

- service는 FastAPI request object가 아니라 명시적 입력과 repository interface에 의존한다.
- repository test는 실제 SQLite transaction과 constraint를 검증한다.
- global mutable state와 import 시 DB 연결을 피한다.
- 시간과 외부 카드 provider는 테스트에서 제어할 수 있는 경계를 둔다.
- 구현되지 않은 확장성을 위한 repository hierarchy나 generic service base class는 만들지 않는다.
