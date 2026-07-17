# Pokefolio 로드맵

이 로드맵은 [제품 비전](PRODUCT_VISION.md)을 사용자 가치가 검증되는 순서로 나눈다. 일정 약속이나 확정 구현 명세가 아니며 각 단계의 완료 조건을 확인한 뒤 다음 단계로 이동한다.

## 현재 상태

- Frontend에는 Next.js 최소 scaffold와 Home, Collection, Binder, 기존 `Opening Log` 명칭의 공통 mock 화면이 있다.
- Backend 애플리케이션, 데이터베이스, migration과 실제 API 연결은 아직 없다.
- 현재 작업은 제품 비전과 UX 기획을 Collection Journal 중심으로 재정렬하는 단계다.
- 기존 mock route와 API·ERD 초안의 명칭 변경은 별도 설계와 migration 판단 뒤 진행한다.

## Phase 1: 제품 비전과 디자인 정렬

**사용자 가치:** Pokefolio의 모든 화면과 기능이 카드 관리가 아니라 수집의 설렘, 뿌듯함과 추억을 위해 같은 방향으로 움직인다.

**범위**

- 제품 비전, MVP 가설과 성공 기준 확정
- Home, Collection, Collection Journal, Binder의 정보 우선순위 정의
- Content-first, Apple HIG, anti-AI UI와 Keeper 원칙 정렬
- 구 `Opening Log` 용어와 구현 초안이 받을 영향 기록

**완료 조건**

- [PRODUCT_VISION](PRODUCT_VISION.md), [PROJECT](PROJECT.md), [SCREENS](SCREENS.md), [DESIGN](DESIGN.md)이 서로 충돌하지 않는다.
- 공식 기록 용어가 `Collection Journal`로 통일된다.
- Home이 통계보다 기억과 다음 행동을 먼저 보여주는 390px 목업으로 승인된다.
- 구현된 기능과 향후 요구가 문서에서 명확히 구분된다.

## Phase 2: Collection 기본 데이터 구조

**사용자 가치:** 자신의 카드와 나중에 연결할 수집 기억을 잃지 않고 일관되게 보관할 기반을 얻는다.

**범위**

- 카드 metadata provider, 라이선스와 내부·외부 식별자 결정
- Card와 UserCard의 최소 경계 정의
- UserCard를 카드 종류·상태별로 묶을지 실물 카드 한 장 단위로 둘지 결정
- SQLite, migration, validation과 개인정보 경계 설계

**완료 조건**

- 카드 식별자, 보유 단위, 중복과 삭제 정책이 사용자 흐름으로 설명된다.
- SQLAlchemy 2.x 모델과 Pydantic v2 schema의 경계가 승인된다.
- 빈 DB upgrade, constraint와 PostgreSQL 이전 위험을 검증할 계획이 있다.
- Collection Journal 연결을 막는 구조적 결정이 남아 있지 않다.

## Phase 3: Collection Journal UX

**사용자 가치:** 팩 개봉, 구매, 방문, 선물, 교환과 여행의 순간을 부담 없이 남길 수 있다.

**범위**

- `오늘의 순간` 빠른 기록의 필드 순서와 한 화면 흐름 검증
- 진입 경로의 기록 유형 기본값과 선택 항목의 사용성 검증
- 목록·작성·상세의 loading, empty, error, success 흐름 설계
- 사진·장소·함께한 사람의 개인정보와 삭제 정책 결정

**완료 조건**

- 사용자가 기록 유형만 확인하고 현재 날짜·시간으로 기록을 저장하는 prototype을 완료한다.
- 획득 카드, 오늘의 카드, 한 줄 기록과 사진을 모두 건너뛰어도 저장할 수 있다.
- 선택 항목을 건너뛰어도 기록이 온전하게 보인다.
- 팩 개봉 외 최소 세 가지 수집 경험이 같은 구조로 자연스럽게 기록된다.
- 390px, 확대 텍스트, keyboard와 screen reader 흐름이 승인된다.

## Phase 4: Collection CRUD

**사용자 가치:** 보유 카드를 쉽게 추가·수정·제거하고 카드 이미지 중심으로 다시 찾는다.

**범위**

- 카드 검색, Card Detail과 보유 카드 CRUD
- 수량, 상태, 메모, 최애와 중복 확인
- 최근 추가, 포켓몬·테마·확장팩별 보기의 최소 범위
- Collection의 loading, empty, error, success와 복구 흐름

**완료 조건**

- 카드 검색부터 추가·수정·제거까지 동작한다.
- unique constraint와 validation이 잘못된 수량과 중복 입력을 차단한다.
- 카드 이미지가 filter, badge와 통계보다 먼저 보인다.
- unit, API, component와 핵심 e2e 검증이 통과한다.

## Phase 5: Collection Journal과 Collection 연동

**사용자 가치:** 카드 한 장에서 획득한 순간으로, 기록에서 실제 Collection으로 자연스럽게 오갈 수 있다.

**범위**

- Collection Journal과 획득 카드의 관계 및 transaction 정책 확정
- 기록 저장 시 UserCard 자동 반영 여부와 사용자 확인 흐름 결정
- Card Detail에서 관련 기록, 기록에서 카드 상세 연결
- 부분 실패, 중복 카드와 수정·삭제 시 일관성 복구

**완료 조건**

- 기록과 획득 카드가 원자적으로 저장되거나 명확한 복구 경계를 가진다.
- 자동 수량 변경 여부를 사용자가 이해하고 통제한다.
- 기록 수정·삭제가 Collection 데이터를 예기치 않게 잃게 하지 않는다.
- API, integration과 핵심 e2e 테스트가 통과한다.

## Phase 6: Binder와 Binder Story

**사용자 가치:** 카드를 슬롯에 보관하는 것을 넘어 자신의 취향과 이야기를 시각적으로 표현한다.

**범위**

- Binder 이름, 짧은 설명, 대표 카드와 theme
- 3×3 page, slot 배치·교체·비우기
- 계절, 색감, 장소, 포켓몬과 특별한 기억을 담는 Binder Story
- tap·keyboard 대체 행동과 카드 이미지 비율 검증

**완료 조건**

- Binder 생성부터 page 배치와 재조회까지 동작한다.
- 대표 카드, theme와 설명이 page보다 시각적으로 강하지 않다.
- 390px에서 카드를 식별하고 drag 없이 모든 배치 행동을 완료한다.
- 보유하지 않은 카드 배치와 수량 충돌 정책이 테스트된다.

## Phase 7: Memories

**사용자 가치:** 시간이 지난 뒤 잊고 있던 카드와 순간을 자연스럽게 다시 만난다.

**범위**

- 과거의 오늘, 이번 달의 기억과 처음 등록한 카드
- 여행에서 얻은 카드, 처음 완성한 Binder와 과거의 최애
- Collection Journey의 월·연도별 변화와 기억에 남는 기록
- Memory를 저장할지 기존 데이터에서 계산할지 결정

**완료 조건**

- 최소 두 종류의 Memory가 기존 기록에서 신뢰할 수 있게 생성된다.
- 기록이 부족하거나 날짜가 모호할 때 거짓 추억을 만들지 않는다.
- 숫자를 목표, 순위, streak와 성과 압박으로 표현하지 않는다.
- 사용자가 원본 Collection Journal과 카드로 이동할 수 있다.

## Phase 8: Rule-based Keeper

**사용자 가치:** 자신의 컬렉션에서 미처 보지 못한 작은 변화와 연결을 부담 없는 말로 발견한다.

**범위**

- 색감·테마 변화, Binder 어울림, 과거 기록과 Wishlist·Duplicates 연결 규칙
- 짧고 따뜻한 문장, 관찰 근거, 숨기기와 feedback
- 개인정보, 편향과 잘못된 감정 단정 위험 검토
- 생성형 AI 없이도 동작하는 deterministic 규칙 우선 검증

**완료 조건**

- 모든 제안이 사용자가 이해할 수 있는 사실 근거를 가진다.
- Keeper를 숨기거나 실패해도 핵심 Collection Journal 경험이 동작한다.
- 구매·투자를 명령하거나 취향을 percentage로 단정하지 않는다.
- 규칙별 deterministic test와 경계 사례가 통과한다.

## Phase 9: OCR

**사용자 가치:** 카드 등록 시간을 줄이되 사용자가 최종 결과를 직접 확인하고 기억을 남기는 흐름은 유지한다.

**범위**

- 이미지 입력, 권한, 업로드·삭제와 개인정보 정책
- OCR·인식 provider의 비용, 정확도와 license 비교
- 복수 후보, confidence와 수동 확인 UX
- 실패, 오인식, 저조도와 카드 변형 사례 평가

**완료 조건**

- 사용자가 인식 결과를 확인·수정한 뒤에만 Collection에 반영된다.
- 원본 이미지 보관과 삭제 정책이 명확하다.
- 합의한 정확도와 응답 시간 기준을 충족한다.
- OCR 없이도 수동 등록과 Collection Journal 작성이 온전히 동작한다.

## Phase 10: Trade

**사용자 가치:** Wishlist와 Duplicates를 바탕으로 자신이 공유할 카드와 정보만 선택해 안전하게 교환을 준비한다.

**범위**

- 다중 사용자, 인증, 공개 범위와 차단 정책
- 교환 후보 연결과 제안 상태
- 사용자 동의, 신고와 개인정보 노출 최소화
- 거래 중재, 결제와 배송 포함 여부 결정

**완료 조건**

- 권한과 공개 범위가 API와 UI에서 일관된다.
- 사용자가 공유할 카드와 개인정보를 명시적으로 선택한다.
- 악용, spam, 차단과 신고 위험이 테스트된다.
- 법적·운영 책임과 지원 범위가 문서화된다.
