# Pokefolio Codex 프롬프트 템플릿

대괄호 부분을 작업에 맞게 바꾸고 필요 없는 항목은 삭제한다. 모든 템플릿은 먼저 `AGENTS.md`와 관련 문서를 확인하고 요청 범위 밖 작업을 하지 않는 것을 전제로 한다.

## 새 기능

```text
Pokefolio에 [기능 이름]을 구현해줘.

목표:
- [사용자가 달성할 결과]

범위:
- 포함: [구체적 행동/화면/API]
- 제외: [이번에 하지 않을 내용]

먼저 확인할 문서:
- docs/PROJECT.md
- docs/ROADMAP.md
- [관련 문서]

제약:
- 390px 모바일 우선
- 기존 API/ERD 계약 유지 또는 변경 이유 제시
- 불필요한 dependency와 추상화 금지
- loading, empty, error, success 고려

검증:
- 관련 lint, typecheck, test, build를 실제 실행
- 변경 파일, 검증 결과, 남은 문제 보고
```

## UI 구현

```text
Pokefolio의 [화면/컴포넌트] UI를 구현해줘.

사용자 목표: [핵심 목표]
Primary action: [한 가지 기본 행동]
참고: docs/DESIGN.md, docs/SCREENS.md, 승인된 목업

필수 상태:
- loading: [기대 형태]
- empty: [설명과 행동]
- error: [복구 행동]
- success: [핵심 콘텐츠]

제약:
- 390px 먼저, 768px 이상도 확인
- 카드 이미지 중심, safe area와 44×44 CSS px 터치 영역 고려
- semantic HTML, keyboard, focus, alt, contrast, 확대 텍스트, reduced motion 검수
- Server Component 우선, use client 최소화
- 공식 포켓몬 UI 모방과 과도한 장식 금지

완료 시 실제 lint, typecheck, component/e2e test, build와 viewport 검수 결과를 보고해줘.
```

## API 구현

```text
docs/API.md의 [method path]를 구현해줘.

참고:
- docs/API.md
- docs/ERD.md
- docs/CODING_RULES.md
- docs/DECISIONS.md

요구사항:
- FastAPI router는 HTTP 처리만 담당
- service에 business rule과 transaction 배치
- repository에 SQLAlchemy query 배치
- SQLAlchemy 2.x DB model과 Pydantic v2 schema 분리
- [request/response/error 계약]
- SQLite와 PostgreSQL 호환성 유지

테스트:
- success
- validation 422
- not found 404
- conflict 409
- transaction rollback 또는 관련 integration 경로

migration이 필요하면 Alembic revision과 upgrade 검증을 포함하고 실제 pytest 결과를 보고해줘.
```

## 버그 수정

```text
Pokefolio의 다음 버그를 진단하고 수정해줘.

증상: [관찰한 현상]
재현 절차:
1. [단계]
2. [단계]
기대 결과: [정상 결과]
실제 결과: [현재 결과]

관련 로그/화면/API: [정보]

먼저 원인을 재현하고 공통 경로를 추적해. 실패하는 회귀 테스트를 작성한 뒤 최소 수정으로 통과시켜줘. 관련 없는 리팩터링은 하지 말고 전체 검증 결과와 남은 위험을 보고해줘.
```

## 코드 리뷰

```text
[브랜치/diff/PR]을 Pokefolio 기준으로 리뷰해줘. 수정은 하지 마.

요구사항과 참고 문서: [링크 또는 파일]

우선 확인:
- behavior와 사용자 흐름
- API request/response/error 계약
- SQLAlchemy transaction, constraint, migration, SQLite 호환성
- Next.js Server/Client 경계와 데이터 호출 위치
- 390px overflow, loading/empty/error/success
- keyboard, focus, label, alt, contrast, touch target, 확대 텍스트, reduced motion
- security/privacy, scope, 테스트 누락
- 불필요한 abstraction과 dependency

재현 가능한 finding만 심각도 순으로 파일/위치, 문제, 재현, 최소 수정 방향과 함께 보고해줘. finding이 없으면 검증 공백을 명시해줘.
```

## 리팩터링

```text
[대상]을 behavior 변경 없이 리팩터링해줘.

목표: [구체적 복잡성/중복/경계 문제]
유지할 계약: [API, props, schema, behavior]
범위 제외: [기능 추가, dependency 변경 등]

리팩터링 전 관련 호출자와 테스트를 확인하고, 기능 구현과 섞지 마. 가장 작은 구조 개선을 선택하고 기존 테스트와 필요한 특성 테스트를 실제 실행해 결과를 보고해줘.
```

## 테스트 추가

```text
[기능/계약]의 부족한 테스트를 추가해줘. 구현 behavior는 바꾸지 마.

참고: docs/TESTING.md, [관련 API/화면 문서]
보호할 위험: [회귀 또는 실패 경로]
필수 사례: [success/empty/error/validation/transaction/accessibility 중 해당 항목]

내부 구현보다 public behavior를 검증하고 과도한 fixture와 mocking을 피해야 해. 새 테스트가 기존 결함을 발견하면 임의로 구현을 수정하지 말고 증거와 함께 보고해줘. 실행한 정확한 명령과 결과를 포함해줘.
```
