# Pokefolio 초기 저장소 문서 설계

## 목적

Pokefolio의 애플리케이션 구현 전에 제품 범위, 모바일 UX, 데이터 구조, API 계약, 개발 규칙, 테스트 기준을 한곳에서 확인할 수 있는 문서 기반을 만든다. 이번 작업은 구조와 문서만 다루며 Next.js, FastAPI, 패키지 설정, 데이터베이스 및 런타임 코드는 생성하지 않는다.

## 작업 방식

기존 `README.md`, `AGENTS.md`, `docs/PROJECT.md`, `docs/ROADMAP.md`의 유효한 내용을 보존하면서 요구사항에 맞게 확장한다. 전체 재작성이나 추가 문서 계층은 현재 단계에 불필요하므로 피한다. 빈 `scripts/` 디렉터리만 `.gitkeep`으로 유지한다.

## 문서 구조와 책임

| 파일 | 책임 |
| --- | --- |
| `README.md` | 프로젝트 소개, 기능 방향, 기술 스택, 구조, 현재 단계, 문서 색인 |
| `AGENTS.md` | 모든 Codex 작업에 적용되는 범위, 구현, 검증, 보고 규칙 |
| `docs/PROJECT.md` | 제품 비전, 사용자 문제, 사용자, 가치, 흐름, MVP 범위와 성공 기준 |
| `docs/ROADMAP.md` | Phase 0~8의 목표, 작업, 완료 조건 |
| `docs/DESIGN.md` | Apple HIG 기반 모바일 디자인 원칙과 임시 디자인 토큰 |
| `docs/SCREENS.md` | 10개 핵심 화면의 목적, 구성, 액션, 상태, 이동 흐름, ASCII 와이어프레임 |
| `docs/ERD.md` | 초기 엔티티의 필드·관계·제약·인덱스·삭제 정책 후보 |
| `docs/API.md` | health, cards, user cards, wishlist, binders, opening logs API 초안 |
| `docs/CODING_RULES.md` | 프런트엔드와 백엔드의 구현 경계와 코딩 규칙 |
| `docs/TESTING.md` | 테스트 계층, MVP 최소 범위, 향후 검증 명령과 완료 기준 |
| `docs/DECISIONS.md` | 확정된 기술·제품 결정을 ADR 형식으로 기록 |
| `docs/PROMPTS.md` | 반복 가능한 Codex 작업 프롬프트 템플릿 |

## 제품 범위

Pokefolio는 카드의 가격이나 투자가 아니라 수집, 기록, 꾸미기, 교환의 즐거움에 집중하는 모바일 우선 웹 서비스다. MVP는 로그인 없는 단일 사용자 환경에서 컬렉션, 위시리스트, 가상 바인더, 개봉일기를 제공한다. 취향 분석, 규칙 기반 추천, OCR, 카드 인식, 교환은 로드맵의 후속 단계로 둔다.

## 기술 및 데이터 설계

- 모노레포 경계는 `frontend/`, `backend/`, `docs/`, `scripts/`로 유지한다.
- 프런트엔드는 Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, npm을 사용한다.
- 백엔드는 FastAPI, SQLAlchemy 2.x typed declarative mapping, Alembic, Pydantic v2를 사용한다.
- SQLModel은 사용하지 않고 영속성 모델과 API 요청·응답 스키마를 분리한다.
- 로컬 MVP는 SQLite로 시작하되 PostgreSQL 이전을 막는 native SQL과 SQLite 전용 기능은 최소화한다.
- 프런트엔드와 백엔드는 문서화된 HTTP/JSON API 계약으로만 통신한다.
- Docker와 인증은 MVP 초기 범위에서 제외한다.

ERD와 API는 구현 계약의 초안이다. 식별자는 예시에서 정수형으로 표현하되 최종 키 전략, 외부 카드 데이터 제공자, 페이지네이션 방식처럼 구현 전에 검증이 필요한 항목은 미결정 사항으로 명시한다.

## UX 및 화면 설계

- 390px 모바일 뷰포트를 기준으로 하고 카드 이미지를 가장 중요한 시각 콘텐츠로 둔다.
- 흰색·밝은 중성 표면, 절제된 보라색 포인트, 넉넉한 여백, 일관된 둥근 모서리와 약한 깊이를 사용한다.
- 색상 값은 역할 기반 임시 토큰과 예시값으로만 기록하며 구현 전 대비 검증을 거쳐 확정한다.
- 하단 내비게이션은 핵심 목적지에 한정하고 safe area를 침범하지 않는다.
- 모든 데이터 화면은 loading, empty, error, success 상태와 가능한 복구 행동을 정의한다.
- 시맨틱 구조, 키보드 조작, 가시적 포커스, 의미 있는 대체 텍스트, 최소 44×44 CSS px 터치 영역, 확대 텍스트, 색상 외 상태 단서, `prefers-reduced-motion`을 기본 요구사항으로 둔다.
- 공식 포켓몬 UI나 브랜드 자산을 모방하지 않고 과도한 그라데이션, glassmorphism, 그림자, 배지, 애니메이션, 대시보드 밀도를 피한다.

## API 및 오류 원칙

API 문서는 method, path, 목적, 요청·응답 예시, 대표 오류를 함께 제공한다. 오류는 일관된 JSON envelope를 사용하고 validation, not found, conflict, internal error를 구분한다. 목록 API의 필터와 페이지네이션은 초안 수준에서 일관된 형태로 제시하며 실제 구현 전에 카드 데이터 소스와 데이터 규모를 확인한다.

## 테스트 및 검증

현재는 애플리케이션과 패키지 설정이 없으므로 런타임 테스트 명령을 실행할 수 없다. 이번 작업은 다음 항목을 검증한다.

1. 요구된 파일과 빈 디렉터리 유지 파일 존재
2. Markdown 상대 링크 대상 존재
3. `package.json`, `pyproject.toml`, SQLite DB 등 금지된 산출물 미생성
4. `git diff --check` 통과
5. 문서 간 기술 결정, 단계, 용어의 일관성
6. 변경 범위에 대한 `code-review` 기준 자체 검토

향후 scaffold 단계에서 실제 lint, typecheck, unit, component, API, integration, e2e, build 명령을 확정한다. 실행하지 않은 검증은 통과했다고 기록하지 않는다.

## 완료 조건

- 요청된 저장소 구조와 10개 `docs/` 문서가 존재한다.
- README와 AGENTS가 현재 단계 및 작업 규칙을 정확히 안내한다.
- SQLAlchemy 2.x, Alembic, Pydantic v2 결정이 관련 문서에서 충돌 없이 유지된다.
- 화면, ERD, API는 구현된 기능이 아닌 초안으로 명확히 표시된다.
- 애플리케이션 코드나 의존성 파일이 추가되지 않는다.
- 변경 파일, 검증 결과, 미결정 사항, 다음 권장 작업 한 가지를 완료 보고에 포함한다.
