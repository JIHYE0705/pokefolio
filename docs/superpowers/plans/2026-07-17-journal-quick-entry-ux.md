# Pokefolio Journal Quick Entry UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 승인된 Journal 빠른 기록 UX를 제품 문서 전반에 일관되게 반영해 `Moment` 중심의 제품 구조, 3결정 기록 흐름, 저장 보상, Timeline, Home 재방문 구조, 복구 가능한 삭제 원칙을 구현 전 계약으로 확정한다.

**Architecture:** 이번 변경은 문서 계약만 수정한다. [승인된 UX 명세](../specs/2026-07-17-journal-quick-entry-ux-design.md)를 단일 기준으로 삼고, 제품 정의에서 화면·디자인·데이터 검토·로드맵으로 결정을 내려 보낸다. 데이터 모델과 API는 확정하거나 구현하지 않고 영향과 Open Questions만 기록한다.

**Tech Stack:** Markdown, Git, `rg`, `git diff`

## Global Constraints

- 애플리케이션 코드, 프런트엔드 컴포넌트, 백엔드 모델, migration, API 문서를 수정하지 않는다.
- `Moment`가 중심 객체이고 카드와 사진은 선택적으로 연결되는 요소라는 방향을 모든 문서에서 유지한다.
- 빠른 기록에서 기록 유형만 필수로 두며 별점은 MVP에서 제외한다.
- 기존에 유효한 기술·아키텍처 결정과 제품 방향 변경에 무관한 내용을 보존한다.
- 구현되지 않은 기능은 현재 제공되는 기능처럼 표현하지 않는다.
- 확정되지 않은 보관 기간, 사진 확장, 입력 복구 범위 등은 `Open Questions`로 남긴다.
- `image.png`, `.idea/`, `.superpowers/`를 스테이징하지 않는다.

---

## Task 1: Moment 중심 제품 계약 확정

**Files:**

- Modify: `docs/PRODUCT_VISION.md`
- Modify: `docs/PROJECT.md`
- Modify: `docs/DECISIONS.md`

- [ ] **Step 1: 현재 제품 계약에서 카드 중심 표현 찾기**

Run:

```bash
rg -n "카드 또는 수집 경험|카드 등록|Opening Log|별점|Moment|오늘의 순간|휴지통" docs/PRODUCT_VISION.md docs/PROJECT.md docs/DECISIONS.md
```

Expected: `Moment` 중심 정의와 충돌하거나 보완이 필요한 문장 위치가 출력된다.

- [ ] **Step 2: 제품 비전에 Moment 구조 반영**

`docs/PRODUCT_VISION.md`에 다음 계약을 반영한다.

- 핵심 객체는 카드가 아니라 사용자가 기억하고 싶은 `Moment(오늘의 순간)`이다.
- `Moment → Cards / Photo`이며 카드와 사진 없이도 방문·여행·특별한 순간을 기록할 수 있다.
- 저장 행위 자체가 오늘 남긴 기억을 다시 보여주는 작은 보상이 된다.
- Journal Timeline과 `1년 전 오늘`은 기억을 다시 꺼내보게 하는 핵심 경험이다.
- 내부 링크로 승인 명세와 관련 화면 문서를 연결한다.

- [ ] **Step 3: MVP 사용자 여정과 성공 기준 정렬**

`docs/PROJECT.md`를 다음 기준으로 정리한다.

- 핵심 여정은 `기록 유형 선택 → 사진 또는 카드 선택(건너뛰기 가능) → 기억 남기기`의 3결정 흐름이다.
- 첫 기록 Empty State, 저장 보상, Timeline, Home의 `오늘 기록한 순간 → 오늘의 카드 → 1년 전 오늘 → 이어서 꾸밀 Binder` 순서를 MVP 계약으로 설명한다.
- 기록 유형 외 필드는 선택이며 별점은 MVP 제외 범위에 둔다.
- 휴지통 이동·되돌리기·복원을 사용자 안전 원칙으로 기록하되 영구 보관 기간은 미결정으로 남긴다.

- [ ] **Step 4: ADR 추가 및 기존 ADR 정합성 보강**

`docs/DECISIONS.md`에 ADR 형식으로 다음을 기록한다.

- `Moment`를 Journal의 중심 객체로 정의하고 카드는 연결 요소로 둔다.
- 빠른 기록의 평가 필드로 별점을 사용하지 않는다.
- 삭제 대신 휴지통 이동과 복원을 기본 흐름으로 둔다.
- 필요하면 ADR-014의 맥락과 결과를 승인된 3결정 흐름에 맞게 보강한다.

- [ ] **Step 5: Task 1 용어 검증**

Run:

```bash
rg -n "Moment|오늘의 순간|3결정|별점|휴지통|복원|1년 전 오늘" docs/PRODUCT_VISION.md docs/PROJECT.md docs/DECISIONS.md
```

Expected: 핵심 결정이 세 문서에 역할에 맞게 나타나며 별점은 제외 결정으로만 언급된다.

- [ ] **Step 6: Task 1 커밋**

```bash
git add docs/PRODUCT_VISION.md docs/PROJECT.md docs/DECISIONS.md
git commit -m "docs: center journal experience on moments"
```

---

## Task 2: 화면·상태·디자인 계약 반영

**Files:**

- Modify: `docs/SCREENS.md`
- Modify: `docs/DESIGN.md`

- [ ] **Step 1: 기존 Journal과 Home 명세의 충돌 지점 확인**

Run:

```bash
rg -n "Collection Journal|Home|통계|오늘 어떤|무엇을 남길까요|별점|저장되었습니다|삭제|Keeper" docs/SCREENS.md docs/DESIGN.md
```

Expected: 승인된 문구·상태·Home 순서로 교체하거나 보완할 위치가 출력된다.

- [ ] **Step 2: Journal 화면 목적과 우선순위 재작성**

`docs/SCREENS.md`의 Journal 섹션을 승인 명세에 맞춰 정리한다.

- 화면 감정은 설렘과 부담 없는 회상이다.
- 첫 콘텐츠는 날짜순 `Moment` Timeline이다.
- 핵심 CTA는 `첫 순간 기록하기` 또는 `기억 남기기`다.
- 기록 유형 문구는 승인된 네 가지 표현으로 통일한다.
- 선택 입력은 카드, 오늘의 카드, 한 줄 기록, 사진이며 별점은 표시하지 않는다.
- 카드나 사진이 없는 `Moment`도 정상 Success 상태로 취급한다.

- [ ] **Step 3: 390px 빠른 기록 상태 와이어프레임 반영**

승인 명세를 중복 복사하지 않고 `docs/SCREENS.md`에는 화면 계약을 판단할 수 있는 대표 390px 와이어프레임과 상태별 차이를 기록한다.

- First-run Empty
- 기록 유형 선택
- 선택 입력 기본 상태
- Card loading / empty / error / selected
- 오늘의 카드 disabled / selected
- Photo selected / unavailable
- Saving / save error
- Saved reward
- 취소 시 작성 내용 확인

상세 상태는 승인 명세에 링크하고, 각 상태의 CTA 활성 조건과 사용자 입력 보존 원칙을 명시한다.

- [ ] **Step 4: Timeline, Home, 휴지통 상태 반영**

`docs/SCREENS.md`에 다음을 반영한다.

- Timeline loading / empty / error / success와 대표 390px 와이어프레임
- Timeline 항목은 존재하는 정보만 보여주며 사진·유형·한 줄·오늘의 카드의 위계를 유지한다.
- Home은 `오늘 기록한 순간 → 오늘의 카드 → 1년 전 오늘 → 이어서 꾸밀 Binder` 순서로 갱신한다.
- Keeper는 초기 Home의 고정 영역으로 두지 않는다.
- 삭제 CTA를 전면에 노출하지 않고 `휴지통으로 이동 → 되돌리기/복원`을 기본으로 한다.
- 영구 삭제는 휴지통에서 별도 확인하며 보관 기간은 Open Question으로 둔다.

- [ ] **Step 5: 디자인 원칙에 감정과 안전 계약 추가**

`docs/DESIGN.md`를 다음 기준으로 보강한다.

- Empty State는 결핍을 선언하기보다 첫 행동과 기대를 안내한다.
- 기록 폼은 단계 수가 아니라 사용자가 내려야 하는 결정 수를 최소화한다.
- 저장 완료는 toast 한 줄이 아닌 기억을 다시 보여주는 작은 보상 화면이다.
- Timeline에서는 카드보다 `Moment`의 맥락과 시간이 먼저 읽힌다.
- 추억 삭제는 복구 가능성을 명확히 하고 파괴적 액션의 시각적 우선순위를 낮춘다.
- Apple HIG에 맞춰 44×44 CSS px 터치 영역, 가시적 포커스, 상태의 비색상 단서, 확대 텍스트, reduced motion을 유지한다.
- 과도한 카드 컨테이너·배지·그라데이션·Keeper 노출을 금지한다.

- [ ] **Step 6: Task 2 문구와 상태 검증**

Run:

```bash
rg -n "첫 번째 추억|첫 순간 기록하기|오늘 어떤 순간을 기억하고 싶나요|카드를 데려왔어요|사진이나 카드를 남겨보세요|오늘의 순간이 기록됐어요|1년 전 오늘|휴지통으로 이동|되돌리기|복원" docs/SCREENS.md docs/DESIGN.md
```

Expected: 승인된 핵심 문구와 복구 흐름이 문서에 존재한다.

Run:

```bash
rg -n "★★★★★|별점 입력|평가해" docs/SCREENS.md docs/DESIGN.md
```

Expected: 결과가 없다.

- [ ] **Step 7: Task 2 커밋**

```bash
git add docs/SCREENS.md docs/DESIGN.md
git commit -m "docs: specify moment-first journal states"
```

---

## Task 3: 데이터 영향과 로드맵 정렬

**Files:**

- Modify: `docs/ERD.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: 기존 데이터 초안과 단계 완료 조건 확인**

Run:

```bash
rg -n "OpeningLog|JournalEntry|CollectionJournal|Attachment|Memory|UserCard|별점|삭제|복원|Phase 3|Phase 5|Phase 7" docs/ERD.md docs/ROADMAP.md
```

Expected: 구현을 확정하지 않고 검토해야 할 기존 엔티티와 단계가 출력된다.

- [ ] **Step 2: ERD Open Questions를 Moment 중심으로 재구성**

`docs/ERD.md`는 모델 코드를 확정하지 않고 다음 영향을 기록한다.

- `Moment`/`JournalEntry` 명칭과 저장 경계
- 하나의 `Moment`에 카드 0개 이상, MVP 사진 0개 또는 1개를 연결하는 후보 관계
- 오늘의 카드는 연결된 카드 중 선택한다는 무결성 후보
- 기록 유형 필수, 날짜·시간 자동, 한 줄 기록 선택이라는 필드 계약
- 카드 없는 `Moment` 허용
- 휴지통 이동·복원에 필요한 soft delete 또는 별도 상태의 후보와 영구 보관 기간 미결정
- 사진 다중화와 `Attachment` 일반화는 MVP 이후 검토
- 별점 필드는 MVP 요구사항에서 제외
- 기존 `OpeningLog` 초안은 구현된 모델이 아니며 migration 계획도 아직 세우지 않음

- [ ] **Step 3: 로드맵의 사용자 가치와 완료 조건 보강**

`docs/ROADMAP.md`에서 특히 Phase 1, 3, 5, 7을 다음 기준으로 정렬한다.

- Phase 1: `Moment` 중심 용어와 화면 계약 승인
- Phase 3: 3결정 흐름, 첫 기록 Empty State, 저장 보상, 전체 상태 계약 검증
- Phase 5: 카드가 선택 연결 요소인 Journal–Collection 연동과 오늘의 카드 무결성
- Phase 7: Timeline과 `1년 전 오늘`을 통한 자연스러운 회상
- 복구 가능한 삭제의 구현 시점은 데이터 구조 결정 이후로 명확히 배치
- 별점은 MVP 완료 조건에 포함하지 않음

- [ ] **Step 4: Task 3 검증**

Run:

```bash
rg -n "Moment|카드 없는|0개 이상|사진|오늘의 카드|휴지통|복원|1년 전 오늘|Open Questions" docs/ERD.md docs/ROADMAP.md
```

Expected: 데이터 영향은 후보·미결정으로, 로드맵은 사용자 가치와 완료 조건으로 구분되어 나타난다.

- [ ] **Step 5: Task 3 커밋**

```bash
git add docs/ERD.md docs/ROADMAP.md
git commit -m "docs: align journal data questions and roadmap"
```

---

## Task 4: 문서 전체 정합성 및 범위 검증

**Files:**

- Verify: `docs/PRODUCT_VISION.md`
- Verify: `docs/PROJECT.md`
- Verify: `docs/SCREENS.md`
- Verify: `docs/DESIGN.md`
- Verify: `docs/ROADMAP.md`
- Verify: `docs/ERD.md`
- Verify: `docs/DECISIONS.md`
- Verify: `docs/superpowers/specs/2026-07-17-journal-quick-entry-ux-design.md`

- [ ] **Step 1: 핵심 용어와 제외 항목 전수 검색**

Run:

```bash
rg -n "Opening Log|OpeningLog|Collection Journal|Journal|Moment|오늘의 순간|별점|평점|시세|투자" docs/PRODUCT_VISION.md docs/PROJECT.md docs/SCREENS.md docs/DESIGN.md docs/ROADMAP.md docs/ERD.md docs/DECISIONS.md
```

Expected: 사용자 노출 용어는 `Journal`/`오늘의 순간`으로 일관되고, `OpeningLog`는 기존 데이터 초안 또는 변경 맥락에서만 나타나며, 별점은 제외 결정으로만 나타난다.

- [ ] **Step 2: Markdown 내부 링크 검증**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re

root = Path("docs")
missing = []
for path in root.rglob("*.md"):
    text = path.read_text()
    for target in re.findall(r"\[[^]]+\]\(([^)#]+)(?:#[^)]+)?\)", text):
        if "://" in target or target.startswith("mailto:"):
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            missing.append(f"{path}: {target}")
if missing:
    raise SystemExit("\n".join(missing))
print("Markdown links OK")
PY
```

Expected: `Markdown links OK`.

- [ ] **Step 3: 문서 외 변경이 없는지 확인**

Run:

```bash
git diff --name-only
git diff --cached --name-only
```

Expected: 이번 작업의 변경·스테이징 목록에는 계획된 `docs/` Markdown 파일만 있다. `frontend/`, `backend/`, `docs/API.md`, `image.png`, `.idea/`, `.superpowers/`는 없다.

- [ ] **Step 4: 공백 오류와 최종 상태 검증**

Run:

```bash
git diff --check
git status --short --branch
```

Expected: `git diff --check` 출력이 없고, 브랜치는 `docs/redefine-product-vision`이며 `image.png`, `.idea/`, `.superpowers/`는 untracked 상태로 남는다.

- [ ] **Step 5: 최종 문서 커밋이 필요한 경우에만 수행**

검증 과정에서 문서 정합성 수정이 생긴 경우에만 해당 `docs/` 파일을 명시적으로 추가하고 커밋한다. `git add .`는 사용하지 않는다.

```bash
git add docs/PRODUCT_VISION.md docs/PROJECT.md docs/SCREENS.md docs/DESIGN.md docs/ROADMAP.md docs/ERD.md docs/DECISIONS.md
git commit -m "docs: finalize moment-first product contracts"
```

- [ ] **Step 6: 완료 보고 후 중지**

다음을 보고하고 코드 구현을 시작하지 않는다.

- 생성·수정한 파일
- `Moment` 중심으로 바뀐 제품 정의
- 통일한 용어와 제외한 별점
- 보관 기간·사진 확장 등 Open Questions
- 기존 ERD와 향후 API에 미칠 영향
- 실제 실행한 검증과 결과
- 다음 권장 작업 1개: 문서 리뷰 승인 후 Journal UI 구현 계획 수립

