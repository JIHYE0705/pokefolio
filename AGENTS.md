# AGENTS.md

Pokefolio 저장소에서 작업하는 개발자와 자동화 에이전트가 따라야 할 규칙입니다. 이 파일은 저장소 전체에 적용합니다.

## 작업 시작 전

- `git status`와 기존 변경을 먼저 확인하고 사용자 작업을 보존합니다.
- 요청과 관련된 `docs/` 문서를 읽고 현재 결정, 계약, 범위를 확인합니다.
- 변경을 작고 검토 가능한 단위로 나눕니다.
- 요청하지 않은 기능, 파일, 추상화, 호환 계층을 추가하지 않습니다.

## 범위와 변경 원칙

- 관련 없는 파일을 수정하지 않습니다.
- 기능 구현과 대규모 리팩터링을 같은 변경에서 진행하지 않습니다.
- 새 dependency가 필요하면 추가 전에 목적, 대안, 번들·운영 영향을 설명합니다.
- 기존 패턴이나 플랫폼 기본 기능으로 해결할 수 있으면 새 추상화를 만들지 않습니다.
- 기능 변경 시 관련 문서와 테스트도 같은 작업 범위에서 갱신합니다.

## 모노레포 경계

- `frontend/`: Next.js 애플리케이션, 프런트엔드 UI와 테스트만 둡니다.
- `backend/`: FastAPI 애플리케이션, 데이터 접근과 백엔드 테스트만 둡니다.
- `docs/`: 제품 범위, UI, API, 데이터, 결정과 개발 기준을 둡니다.
- `scripts/`: 반복 가능한 개발·검증 작업만 둡니다.
- 프런트엔드와 백엔드는 공개된 HTTP/JSON API 계약으로 통신하며 서로의 내부 모듈을 참조하지 않습니다.

## Frontend

- Next.js App Router와 TypeScript strict를 기준으로 합니다.
- Server Component를 기본으로 하고 `use client`는 가장 작은 상호작용 경계에만 둡니다.
- 재사용 UI는 `components/`, 도메인 기능은 `features/`, 공용 API 접근은 합의된 `lib/` 경계에 둡니다.
- 390px 뷰포트를 먼저 구현·검수하고 넓은 화면으로 확장합니다.
- 모든 데이터 화면에서 loading, empty, error, success 상태를 고려합니다.
- 시맨틱 HTML, 키보드 조작, 가시적 포커스, 충분한 대비와 터치 영역을 기본 요구사항으로 봅니다.

## Pokefolio UI

- [DESIGN](docs/DESIGN.md), [SCREENS](docs/SCREENS.md), 승인된 목업, Apple HIG 관련 지침을 확인합니다.
- 카드 이미지를 핵심 시각 콘텐츠로 두고 UI 장식이 카드 정보를 가리지 않게 합니다.
- 흰색 또는 밝은 중성 표면, 넉넉한 여백, 일관된 둥근 모서리, 약한 깊이, 절제된 보라색 강조를 사용합니다.
- 공식 포켓몬 앱이나 브랜드 UI를 직접 모방하지 않습니다.
- 과도한 그라데이션, glassmorphism, 그림자, 애니메이션, 장식 배지, 밀집 대시보드를 피합니다.
- safe area, 44×44 CSS px 수준의 터치 영역, 확대 텍스트, 색상 외 상태 단서, `prefers-reduced-motion`을 고려합니다.

## Backend

- SQLAlchemy 2.x typed declarative mapping, Alembic, Pydantic v2를 사용하고 SQLModel은 사용하지 않습니다.
- DB 모델과 API 요청·응답 스키마를 분리합니다.
- FastAPI router는 HTTP 처리, service는 비즈니스 규칙, repository는 영속성 접근을 담당합니다.
- SQLite로 시작하지만 PostgreSQL 이전을 막는 native SQL과 SQLite 전용 기능은 최소화합니다.
- 외부 입력과 API 출력은 명시적인 Pydantic 스키마로 검증합니다.
- 스키마 변경은 Alembic migration으로 관리하고 로컬 DB를 Git에 포함하지 않습니다.

## 보안과 저장소 위생

- 비밀키, 인증정보, `.env` 파일, 개인 데이터, 로컬 SQLite DB를 커밋하지 않습니다.
- `node_modules`, build, coverage, cache 등 생성 산출물을 커밋하지 않습니다.
- 로그와 예시 데이터에 민감한 정보를 넣지 않습니다.

## 검증

- 문서나 코드에 적힌 검증 명령을 실제로 실행하고 결과를 확인합니다.
- frontend 구현 단계에서는 lint, typecheck, test, build를 각각 실행합니다.
- backend 구현 단계에서는 관련 unit, API, integration 테스트와 migration 검증을 실행합니다.
- 한 검증 결과를 다른 검증의 대체로 사용하지 않습니다.
- 실행할 수 없는 검증은 이유와 영향을 명시합니다.
- 오류나 실패가 남아 있으면 완료로 보고하지 않습니다.
- 완료 전 `git diff --check`, 변경 파일, `git status`를 확인합니다.

## 완료 보고

완료 보고에는 다음을 포함합니다.

1. 생성·수정한 파일
2. 핵심 결정과 사용자에게 보이는 변화
3. 실제 실행한 검증 명령과 결과
4. 남은 문제, 미결정 사항, 실행하지 못한 검증

## 현재 단계

현재 Frontend는 Next.js 최소 scaffold와 공통 mock 레이아웃 단계이며 Backend는 아직 문서 단계입니다. 별도 요청 전까지 API 연결, Backend 코드, 데이터베이스 또는 migration을 추가하지 않습니다.
