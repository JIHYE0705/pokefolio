# Pokefolio 제품 방향 재정의 설계

## 목적

Pokefolio의 중심을 카드 보유량 관리에서 수집의 설렘, 뿌듯함, 추억을 기록하고 다시 보는 모바일 컬렉션 저널로 옮긴다. 이번 작업은 제품 비전과 UX 기획 문서만 정렬하며 애플리케이션 코드, 컴포넌트, 백엔드 모델, migration, API 구현은 변경하지 않는다.

## 제품 정의

Pokefolio는 사용자가 언제든 자신이 모은 카드와 그 카드를 모았던 순간까지 다시 꺼내볼 수 있게 하는 모바일 컬렉션 저널이다.

- 핵심 문장: 언제든 내가 모은 카드와, 그 카드를 모았던 순간까지 다시 꺼내볼 수 있는 공간.
- 영문 슬로건: Collect memories, not just cards.
- 핵심 감정: 설렘, 뿌듯함, 추억
- 공식 기록 용어: `Collection Journal`
- 조용한 동반자 명칭: `Keeper`

시세, 투자, 통계, CRUD, AI는 제품의 전면에 두지 않는다. 필요해지더라도 사용자의 수집 경험을 돕는 보조 수단으로만 평가한다.

## 문서 구조와 책임

### `docs/PRODUCT_VISION.md`

제품 판단의 최상위 기준으로 새로 만든다. 첫 문장은 반드시 “Pokefolio는 카드 관리 앱이 아니다.”로 시작한다. 제품의 존재 이유, 사용자 문제와 사용자, 핵심 감정, 제품 원칙, 하지 않는 것, 핵심 경험, Keeper, 슬로건, 판단 기준과 향후 기능 평가 질문을 담는다.

### `docs/PROJECT.md`

[제품 비전](../../PRODUCT_VISION.md)을 실행 가능한 MVP 정의로 번역한다. 핵심 사용자 여정, MVP 목표와 기능, 검증 가설, 성공 기준, 제외 범위를 정리하고 기존 기술 경계와 구현 전 미결정 사항은 유지한다.

### `docs/SCREENS.md`

Home, Collection, Collection Journal, Binder를 새 제품 방향의 핵심 화면으로 재정의한다. 각 화면은 다음 형식을 공유한다.

- 사용자가 느껴야 하는 감정
- 화면의 핵심 목적
- 첫 번째로 보여야 할 콘텐츠
- 핵심 CTA와 보조 CTA
- 표시하면 안 되는 정보
- loading, empty, error, success 상태
- 390px 모바일 ASCII 와이어프레임

Home은 통계 요약이 아니라 이어서 꾸밀 바인더, 최근 기억, 최근 카드, 과거의 오늘, Keeper의 짧은 관찰과 한 가지 다음 행동 순으로 구성한다. Card Detail, Wishlist, Trade 등 기존 보조 화면의 유효한 내용은 삭제하지 않되 새 핵심 화면과 용어에 맞게 연결만 정리한다.

### `docs/DESIGN.md`

기존 Apple HIG, 접근성, 모바일 우선, 카드 이미지 비율과 상태 원칙을 유지한다. 다음 기준을 명시적으로 강화한다.

- Content before chrome
- Typography and spacing before containers
- 실제 카드 이미지가 UI 장식보다 먼저 보임
- 기록은 날짜·장소·사진·짧은 문장과 카드의 관계로 표현
- Keeper는 관찰할 가치가 있을 때만 짧게 노출
- 따뜻한 감정을 절제된 표현으로 전달
- 반복 카드 컨테이너, 중첩 카드, 통계 타일, 과도한 pill·배지·CTA, 보라색 gradient·glow, 의미 없는 sparkle 금지

Apple 고유 UI를 복제하지 않고 clarity, deference, depth, familiarity, adaptability, accessibility를 웹에 적용한다. 공식 Pokémon UI와 브랜드 자산은 모방하지 않는다.

### `docs/ROADMAP.md`

로드맵을 다음 순서로 재구성한다.

1. 제품 비전과 디자인 정렬
2. Collection 기본 데이터 구조
3. Collection Journal UX
4. Collection CRUD
5. Collection Journal과 Collection 연동
6. Binder와 Binder Story
7. Memories
8. Rule-based Keeper
9. OCR
10. Trade

각 단계에는 구현 목록보다 사용자 가치와 검증 가능한 완료 조건을 먼저 둔다. 현재 Frontend scaffold와 mock UI가 존재하고 Backend는 문서 단계라는 사실을 유지한다.

### `docs/ERD.md`

현재 ERD를 구현 계약으로 확정하지 않는다. 기존 `OpeningLog` 구조를 즉시 이름만 바꿔 확정하지 않고 다음 후보를 미결정 사항으로 기록한다.

- `JournalEntry` 또는 `CollectionJournal`
- `JournalEntryCard`
- 사진 또는 `Attachment`
- 기록 유형, 장소, 당시 기분, 한 줄 기록
- Binder의 `theme`, `description`, `cover_card`
- Memory를 저장할지 기존 기록에서 계산할지
- `UserCard`를 카드 종류·상태별 묶음으로 둘지 실물 카드 한 장 단위로 둘지
- Journal 저장과 Collection 반영의 transaction 경계

### `docs/DECISIONS.md`

기존 ADR은 유지하고 후속 ADR로 다음 결정을 추가한다.

1. Pokefolio를 컬렉션 관리 앱이 아닌 컬렉션 저널로 정의한다.
2. 시세와 투자 기능을 제품 핵심에서 제외한다.
3. `Opening Log`를 더 넓은 `Collection Journal` 개념으로 확장한다.
4. Keeper를 AI 분석기가 아닌 조용한 컬렉션 동반자로 정의한다.
5. Home을 통계 중심에서 기억과 다음 행동 중심으로 변경한다.

기존 ADR-007의 “AI 보조 기능” 결정은 Keeper 결정으로 구체화하되 삭제하지 않는다.

## 용어 규칙

| 개념 | 통일 용어 | 사용하지 않을 용어 |
| --- | --- | --- |
| 수집 경험 기록 기능·화면 | Collection Journal | Opening Log, 개봉일기, Journal, Journey |
| 시간에 따른 수집 변화 | Collection Journey | Journey 단독 표기 |
| 과거 기록 재발견 | Memories | 회상 통계 |
| 조용한 수집 동반자 | Keeper | AI 분석기, AI 추천 박스 |
| 보유 카드 공간 | Collection | 카드 DB, 자산 목록 |

`Opening Log`는 이전 결정의 맥락이나 아직 변경하지 않은 API 초안을 설명할 때만 코드 서식으로 표시한다. 구현된 기능처럼 표현하지 않는다.

## 기존 계약과의 관계

- Next.js App Router, FastAPI, HTTP/JSON, SQLAlchemy 2.x, Alembic, Pydantic v2, SQLite와 PostgreSQL 이전 가능성은 유지한다.
- 기존 `OpeningLog`, `OpeningLogCard`, `/opening-logs` API는 구현 전 초안이다. 이번 작업에서는 API 문서를 수정하지 않고 Collection Journal 요구가 모델과 계약에 미칠 영향을 Open Questions로 남긴다.
- 현재 Frontend의 `/opening-logs` mock route와 컴포넌트는 변경하지 않는다. 후속 구현 계획에서 명칭과 경로 migration 여부를 결정한다.
- 로그인 없는 단일 사용자 MVP와 접근성 기준을 유지한다.

## Open Questions

- Collection Journal의 기록 유형 선택지와 진입 경로별 기본값은 무엇인가?
- 사진의 저장·삭제·용량 정책은 무엇인가?
- 장소와 함께한 사람 정보의 개인정보 처리·삭제 정책은 무엇인가?
- 구매 금액, 별점, 기분처럼 빠른 기록에서 제외한 정보를 후속 확장에서도 제공할 필요가 있는가?
- Memory를 저장된 콘텐츠로 만들지 날짜·장소·카드 관계에서 계산할지?
- Collection Journey를 독립 화면으로 둘지 Home과 Collection의 섹션으로 먼저 검증할지?
- Keeper의 규칙 입력, 설명 근거, 숨기기와 피드백 범위를 어디까지 둘지?
- `OpeningLog` 모델과 `/opening-logs` 경로를 언제, 어떤 호환 정책으로 변경할지?

## 확정된 빠른 기록 구조

`오늘의 순간`은 기록 유형만 필수로 받고 진입 경로에서 기본값을 설정한다. 날짜·시간은 현재 시각으로 자동 저장한다. 획득 카드, 획득 카드 중 오늘의 카드, 한 줄 기록과 사진은 선택이며 `기억 남기기`로 저장한다.

## 검증

- 지정한 여섯 기존 문서와 새 제품 비전 문서만 제품 방향 변경 대상으로 삼는다.
- 내부 Markdown 링크 대상이 존재하는지 확인한다.
- `Collection Journal`, `Collection Journey`, `Memories`, `Keeper` 용어가 문서별 책임에 맞게 쓰였는지 검색한다.
- 새 기능을 현재 구현된 기능처럼 표현하지 않았는지 검토한다.
- API와 ERD의 구 용어가 초안 또는 미결정 맥락임을 분명히 한다.
- `git diff --check`와 `git status --short`를 실행한다.
- `image.png`는 스테이징하거나 수정하지 않는다.
