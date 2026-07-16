# Pokefolio 테스트 전략

현재는 애플리케이션과 package script가 없으므로 아래 명령은 아직 실행할 수 없다. Phase 1 scaffold에서 실제 도구와 script 이름을 확정한 뒤 이 문서를 갱신한다.

## 원칙

- 사용자 행동과 public contract를 우선 테스트하고 내부 구현 세부사항에 과도하게 결합하지 않는다.
- 성공뿐 아니라 loading, empty, error, validation과 회귀 경로를 보호한다.
- 작은 unit test로 규칙을 빠르게 확인하고 API/component/integration으로 경계를 검증한다.
- 한 종류의 검증을 다른 종류의 통과로 대체하지 않는다.
- flaky test는 재실행으로 숨기지 않고 원인을 수정하거나 남은 문제로 보고한다.

## Frontend

### Unit

**범위**

- API 오류 envelope parsing
- 정렬·필터·수량과 표시용 순수 함수
- 날짜·카드 메타데이터 formatting
- 접근성 label을 만드는 결정 로직

DOM이나 browser가 필요 없는 규칙만 unit으로 둔다.

### Component

**범위**

- 카드 grid/list의 success, empty, loading, error
- 검색 입력, 필터, form validation과 오류 연결
- BinderSlot의 empty, selected, disabled와 키보드 행동
- Opening Log 입력 보존과 submit feedback
- accessible name, role, focus, keyboard operation

Server Component 데이터 경계는 필요에 따라 integration 성격의 render test로 검증하고 모든 컴포넌트를 Client Component로 바꾸지 않는다.

### E2E

**MVP 핵심 흐름**

1. 카드 검색 → Card Detail → 컬렉션 추가
2. 보유 수량 수정 → Collection에서 중복 확인
3. 위시리스트 추가·제거
4. 바인더 생성 → 슬롯 배치 → 재조회
5. 개봉일기 생성 → 목록 → 상세

390px viewport를 기본으로 하고 최소 한 번은 768px 이상, 키보드 탐색, 확대 텍스트 또는 browser zoom을 별도 검수한다.

## Backend

### Unit

**범위**

- UserCard quantity와 unique business rule
- Binder page/slot position과 배치 규칙
- OpeningLog transaction 입력 변환
- recommendation 단계의 deterministic rule
- domain exception mapping 입력

DB가 필요 없는 service rule은 fake보다 작은 in-memory stub을 우선하되 실제 SQL 동작은 integration에서 검증한다.

### API

**범위**

- [API 초안](API.md)의 method, path, status, request/response schema
- `404`, `409`, `422`, `500` 오류 envelope
- 누락·잘못된 타입·경계값 validation
- 내부 DB exception과 민감한 정보가 응답에 노출되지 않음

FastAPI test client와 격리된 test database를 사용한다.

### Integration

**범위**

- SQLAlchemy mapping과 SQLite foreign key enforcement
- unique/check constraint와 transaction rollback
- Binder 생성 시 page/slot 원자적 생성
- OpeningLog와 OpeningLogCard 원자적 생성
- Alembic 빈 DB upgrade와 최신 schema 확인
- PostgreSQL 도입 전 dialect 차이가 큰 query의 별도 검증

테스트 DB 파일이 필요하면 임시 디렉터리에 만들고 실행 후 제거하며 Git에 포함하지 않는다.

## MVP 최소 테스트

| 영역 | 최소 보호 범위 |
| --- | --- |
| Health | `200`과 response schema |
| Cards | 검색 결과, 상세 `404`, query validation |
| UserCard | 생성·수정·삭제, quantity, unique 충돌, Binder 참조 충돌 |
| Wishlist | 생성·중복·삭제 |
| Binder | 생성 원자성, page 번호, slot 범위, 배치·비우기 |
| OpeningLog | 생성 원자성, 획득 카드 validation, 목록·상세 |
| Frontend states | 각 핵심 화면의 loading, empty, error, success |
| Accessibility | form label/error, keyboard, focus, image alt, touch target 검수 |
| E2E | 컬렉션, 바인더, 개봉일기 핵심 흐름 |

## 검증 명령

아래 이름은 Phase 1에서 `package.json`과 backend 설정에 실제 script로 정의할 **목표 명령**이다. 현재 실행 가능하다는 뜻이 아니다.

```bash
# Frontend target commands
cd frontend
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build

# Backend target commands
cd backend
pytest
alembic upgrade head
alembic check
```

Phase 1에서 선택할 최소 frontend 도구 기준:

- unit/component: Next.js와 호환되고 DOM 접근성 query를 제공하는 하나의 test runner
- e2e: 390px viewport와 keyboard/browser flow를 재현하는 하나의 browser test tool
- dependency를 선택할 때 npm script, 유지보수 상태, Next.js 호환성, 실행 비용을 문서화한다.

## 문서 단계 검증

애플리케이션 scaffold 전에는 다음을 실행한다.

```bash
git diff --check
git status --short
```

또한 Markdown 상대 링크 대상, 요구 파일 존재, `package.json`, `pyproject.toml`, DB 파일 미생성을 확인한다.

## 완료 기준

- 변경된 behavior와 contract에 대응하는 테스트가 있다.
- 관련 lint, typecheck, unit/component/API/integration/e2e/build 중 적용 가능한 명령을 모두 실제 실행했다.
- 실행한 명령, test 수, failure 수, 건너뛴 검증과 이유를 보고했다.
- 실패와 알려진 회귀가 남아 있지 않다.
- 390px과 넓은 화면, 키보드, 확대 텍스트, safe area, reduced motion 검수 결과가 기록되었다.
