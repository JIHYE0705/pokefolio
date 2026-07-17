# Pokefolio 디자인 원칙

이 문서는 [제품 비전](PRODUCT_VISION.md)을 모바일 UI 판단 기준으로 번역한다. 색상 값과 치수 token은 검증을 위한 provisional 후보이며 확정값이 아니다.

Pokefolio의 감정은 따뜻하게, 표현은 절제되게 만든다. 귀엽고 즐거운 인상은 실제 카드와 사용자의 기억에서 나오며 장식 효과로 대신하지 않는다.

## 핵심 위계

### Content before chrome

- 실제 카드 이미지, 사용자의 사진과 기록을 navigation, filter, 통계와 장식보다 먼저 보여준다.
- UI chrome은 사용자가 콘텐츠를 찾고 기록하고 이어서 꾸미는 데 필요한 만큼만 보인다.
- 넓은 화면에서도 패널을 추가해 dashboard로 만들지 않고 같은 콘텐츠 우선순위를 유지한다.

### Typography and spacing before containers

- 제목, 본문, metadata의 타이포그래피 위계와 여백으로 먼저 그룹을 만든다.
- 구분이 더 필요할 때 divider나 배경 차이를 사용하고, 독립적인 상호작용 단위일 때만 둥근 container를 사용한다.
- 모든 section을 card로 감싸거나 card 안에 card를 중첩하지 않는다.

### Card imagery first

- 카드가 있는 화면에서는 카드 이미지가 가장 크고 강한 시각 요소다.
- badge, 수량, action과 decoration이 카드 이름, artwork와 set number를 가리지 않는다.
- 실제 이미지가 없는 mock은 브랜드를 모방하지 않는 절제된 비율 placeholder를 사용한다.

## 브랜드와 정서

- 분위기는 깨끗하고 귀여우며 따뜻한 개인 수집 앨범에 가깝다.
- 흰색 또는 밝은 중성 배경에 절제된 보라색을 선택, 핵심 행동과 focus에만 사용한다.
- 설렘은 다음 카드와 기록을 기대하게 하는 흐름으로 표현하고 과장된 보상 animation으로 만들지 않는다.
- 뿌듯함은 쌓인 카드, 완성 중인 Binder와 변화한 취향을 보여주되 순위·streak·목표 압박으로 만들지 않는다.
- 추억은 카드와 날짜, 장소, 사진, 함께한 사람과 짧은 문장의 관계로 보여준다.
- 공식 Pokémon UI, logo, character, icon, trade dress와 브랜드 자산을 모방하지 않는다.

## Apple HIG 적용

Apple 고유 component의 외형을 복제하지 않고 다음 보편 원칙을 웹에 적용한다.

- **Clarity:** 화면 목적, 읽기 순서와 한 가지 primary action이 설명 없이 드러난다.
- **Deference:** 카드 이미지와 사용자 콘텐츠가 UI chrome보다 돋보인다.
- **Depth:** 계층과 전환을 이해시키는 경우에만 border, spacing과 매우 약한 shadow를 사용한다.
- **Familiarity:** navigation, search, form, feedback은 모바일에서 익숙한 구조와 동작을 따른다.
- **Adaptability:** safe area, viewport, text enlargement, locale과 input 방식 변화에 대응한다.
- **Accessibility:** 시각, 색상, touch, gesture 하나에만 의미나 행동을 의존하지 않는다.

native iOS 앱처럼 조용하고 콘텐츠 중심이어야 하지만 Apple 앱의 세부 표현을 그대로 복제하지 않는다.

## 색상 역할

| provisional token | 역할 | 임시 예시 | 확정 조건 |
| --- | --- | --- | --- |
| `surface-canvas` | 전체 배경 | `#F7F7FA` | 밝은 환경에서 카드 경계 확인 |
| `surface-content` | 필요한 콘텐츠 표면 | `#FFFFFF` | 반복 container 없이 배경과 구분 |
| `text-primary` | 주요 텍스트 | `#1C1C1E` | body text WCAG AA 대비 확인 |
| `text-secondary` | 보조 텍스트 | `#66666F` | 작은 텍스트 4.5:1 이상 확인 |
| `accent-primary` | 기본 행동·선택·focus | `#6F5BD3` | 모든 상태의 대비 확인 |
| `border-subtle` | divider·입력 경계 | `#E4E4EA` | 고대비와 화면 밝기 확인 |
| `feedback-danger` | 오류·파괴 행동 | `#C93434` | 색상 외 문구와 함께 검증 |
| `feedback-success` | 중요한 완료 | `#287A4B` | 색상 외 문구와 함께 검증 |

- accent를 넓은 배경이나 장식에 반복하지 않는다.
- 상태는 색상뿐 아니라 text, shape와 semantic state로 전달한다.
- 다크 모드는 MVP 이후 검토하되 semantic role을 먼저 유지한다.

## 타이포그래피와 여백

- 플랫폼 기본 sans-serif font stack을 사용해 다운로드와 가독성 부담을 줄인다.
- body 기본 후보는 16~17 CSS px이며 실제 browser 확대와 접근성 검사 후 확정한다.
- 큰 hero보다 화면 제목, section 제목, 본문과 metadata의 명확한 위계를 사용한다.
- 모든 제목 아래에 설명문이나 부제를 자동으로 넣지 않는다.
- 핵심 문장을 강제로 한 줄 말줄임하지 않고 200% 확대에서 수직 적층을 허용한다.

| 항목 | provisional 후보 | 사용 원칙 |
| --- | --- | --- |
| spacing | 4px 기반 `4/8/12/16/24/32` | 관계가 가까운 콘텐츠는 가깝게, section은 여백으로 분리 |
| radius | `8/12/16/24px` | 독립 표면과 control에만 일관되게 사용 |
| shadow | `0 2px 10px rgb(0 0 0 / 0.06)` | Binder pocket 등 물리적 계층이 필요할 때만 사용 |

## 카드 이미지

- 원본 카드 비율 후보는 약 `2.5:3.5`이며 CSS `aspect-ratio: 5 / 7`로 검증한다.
- 이미지는 찌그러뜨리지 않고 `object-fit: contain`을 기본으로 한다.
- 정보성 이미지는 카드 이름, 세트와 구분 가능한 정보를 대체 텍스트에 포함한다. 같은 정보가 바로 인접한 장식용 반복 이미지는 빈 대체 텍스트를 사용한다.
- grid metadata는 카드 이름과 사용자의 기억에 필요한 한 줄만 우선하고 수량·세부 상태는 더 조용하게 둔다.
- 카드 이미지보다 filter bar, badge cluster와 통계가 더 강하게 보이면 실패한 화면이다.

## 추억과 기록 UI

- Journal의 중심 콘텐츠는 카드가 아니라 `Moment(오늘의 순간)`다. 카드와 사진은 Moment에 선택적으로 연결한다.
- Journal Timeline은 연도와 날짜, 기록 유형과 한 줄을 먼저 읽게 하고 대표 카드나 사진은 존재할 때만 보여준다.
- 카드와 사진이 모두 없어도 방문, 여행과 특별한 순간을 온전한 기록으로 저장하고 표시한다.
- 날짜, 장소와 함께한 사람은 기억의 맥락으로 보여주고 form 완료율이나 소비 통계로 만들지 않는다.
- 빠른 기록은 `기록 유형 선택 → 사진 또는 카드 선택(건너뛰기 가능) → 기억 남기기`의 3결정 흐름을 사용한다.
- 기록 유형만 필수이며 진입 경로에서 기본 설정한다. 날짜·시간은 현재 시각으로 자동 저장하고 별도 입력을 요구하지 않는다.
- 획득 카드, 획득 카드 중 오늘의 카드, 한 줄 기록과 사진은 모두 선택이며 비어 있어도 `기억 남기기`를 완료할 수 있다.
- 별점으로 순간을 평가하지 않는다. 기억의 결은 선택적인 한 줄로 남긴다.
- 모든 항목을 강제하거나 빈 필드를 상세 화면에 반복해서 보여주지 않는다.
- 첫 기록이 없을 때는 `아직 카드가 없어요.`처럼 결핍을 선언하지 않고 `첫 번째 추억을 만들어보세요.`와 한 가지 CTA를 보여준다.
- 저장 완료는 toast로 끝내지 않고 날짜와 선택적인 한 줄을 다시 보여주는 `오늘의 순간이 기록됐어요.` 보상 화면을 사용한다.
- Moment 제거는 `휴지통으로 이동`을 기본으로 하고 즉시 되돌리기와 휴지통 복원을 제공한다. 영구 삭제는 휴지통 안에서 별도 확인한다.
- Memories는 기존 기록에서 의미 있는 장면을 다시 보여주며 streak, ranking이나 놓쳤다는 죄책감을 만들지 않는다.

상세 문구와 상태는 [Journal 빠른 기록 UX 설계](superpowers/specs/2026-07-17-journal-quick-entry-ux-design.md)를 따른다.

## Keeper 노출 원칙

- Keeper는 사용자의 콘텐츠 안에서 실제로 관찰할 작은 변화나 연결이 있을 때만 나타난다.
- 한 번에 한두 문장으로 말하고 관련 카드, Binder 또는 Collection Journal로 연결한다.
- 관찰한 사실을 먼저 말하고 확신보다 제안의 형태를 사용한다.
- 사용자의 감정을 단정하거나 구매·투자·교환을 명령하지 않는다.
- 긴 분석, percentage 취향 점수, generic AI insight box, sparkle와 `AI` badge를 사용하지 않는다.
- 사용자가 숨기거나 무시해도 핵심 흐름이 그대로 동작해야 한다.
- 초기 Home에는 Keeper 고정 영역을 두지 않는다. 실제로 보여줄 관찰과 적절한 맥락이 생길 때만 관련 콘텐츠 안에 노출한다.

좋은 표현:

> 최근에는 따뜻한 색감의 카드가 조금씩 많아지고 있어요.

> 봄빛 Binder에는 라티아스 AR도 잘 어울릴 것 같아요.

피해야 할 표현:

> AI 분석 결과 사용자는 파스텔 컬러를 92% 선호합니다. 다음 카드를 구매하세요.

## Navigation

- 핵심 목적지는 Home, Collection, Journal, Binder 네 개로 기획한다. 제품 기능명은 Collection Journal, navigation label은 Journal이다.
- 현재 Frontend mock의 `Opening Log` label과 `/opening-logs` route는 아직 코드에 남아 있으며 이번 문서 작업에서는 변경하지 않는다.
- Wishlist, Memories와 Collection Journey는 핵심 콘텐츠에서 진입하고 사용성 검증 전 새 tab으로 늘리지 않는다.
- 현재 위치는 색상뿐 아니라 text와 semantic current state로 전달한다.
- 각 항목의 전체 touch 영역은 최소 44×44 CSS px를 목표로 하고 `env(safe-area-inset-bottom)`을 반영한다.

## Component 원칙

### Actions

- 한 화면의 primary action은 원칙적으로 하나다.
- primary, secondary, destructive를 문구와 시각으로 구분한다.
- icon-only action에는 accessible name과 최소 44×44 CSS px touch 영역을 제공한다.
- disabled는 opacity만으로 표현하지 않고 native `disabled` 또는 동등한 semantic state를 사용한다.

### Forms

- placeholder를 label의 대체로 사용하지 않는다.
- 사용자가 모든 선택 항목을 채우도록 강제하지 않는다.
- 오류는 입력 가까이에 programmatically 연결하고 저장 실패 시 입력·사진·선택한 카드를 보존한다.
- mobile keyboard가 저장 행동과 오류를 가리지 않게 한다.

### Search and filters

- Collection search는 카드 이름, set와 number 범위를 명확히 한다.
- filter와 sort는 카드 이미지보다 조용하게 보이고 현재 조건을 지울 수 있어야 한다.
- 결과 없음과 오류를 구분하고 query·filter를 보존한다.
- pill은 filter나 segmented control처럼 의미가 있을 때만 사용한다.

### Binder

- 3×3 page를 기본 후보로 하되 390px에서 카드 식별과 touch action을 함께 검증한다.
- 이름, 짧은 설명, 대표 카드와 theme는 page를 설명하며 page보다 시각적으로 강하지 않다.
- drag는 보조 입력이며 tap과 keyboard로 같은 배치·교체·비우기가 가능해야 한다.
- pocket의 border와 shadow는 실제 page 계층을 설명하는 최소 수준으로 제한한다.

## 화면 상태

| 상태 | 원칙 |
| --- | --- |
| Loading | 예상 콘텐츠 형태를 보존하고 장식 skeleton을 늘리지 않음 |
| Empty | 결핍보다 시작할 이유를 설명하고 가장 관련 있는 행동 하나를 제공 |
| Error | 문제를 쉬운 문장으로 설명하고 가능한 경우 입력 보존·재시도 제공 |
| Success | 완료된 콘텐츠를 먼저 보여준다. 기억 저장은 방금 남긴 날짜와 문장을 다시 보여주는 작은 보상으로 마무리 |

자동으로 사라지는 message에 핵심 정보를 의존하지 않고 screen reader가 상태 변화를 인지할 수 있게 한다.

## Safe area와 반응형

- 기준 viewport는 390px이며 page-level horizontal scroll을 허용하지 않는다.
- 상단·하단 고정 UI는 `env(safe-area-inset-*)`를 반영한다.
- 768px 이상에서는 여백이나 콘텐츠 열을 늘리되 dashboard panel과 보조 지표를 추가하지 않는다.
- fixed height보다 content-driven height, wrapping, intrinsic sizing과 fluid grid를 사용한다.

## 접근성

- semantic HTML과 logical heading order를 ARIA보다 먼저 사용한다.
- 모든 행동은 keyboard로 가능하고 visible focus와 predictable order를 유지한다.
- body text는 4.5:1, 큰 굵은 text는 3:1 이상을 목표로 실제 token 확정 시 측정한다.
- 확대 text에서 수평 배치를 수직으로 바꾸고 내용이나 action을 숨기지 않는다.
- gesture에는 항상 보이는 대체 행동을 제공한다.
- motion은 상태와 continuity를 설명할 때만 사용하고 `prefers-reduced-motion`에서 제거하거나 단순화한다.

## Anti-AI UI rejection rules

다음 표현이 보이면 제품 방향과 맞지 않는 것으로 판단한다.

- 모든 section을 card container로 감싸기
- card 안에 card 중첩
- 보라색 gradient, glow와 glowing border
- 의미 없는 sparkle, AI badge와 decorative icon
- 동일한 크기의 통계 card 반복
- 과도한 pill, badge와 arbitrary shadow
- Moment를 평가하는 별점과 form 완료율
- 설명문과 부제를 모든 heading 아래 반복
- oversized hero와 large empty hero panel
- 여러 개의 경쟁하는 CTA
- generic AI insight box와 근거 없는 invented metric
- glassmorphism, blur와 장식 animation
- 기능보다 장식이 먼저 보이는 화면
- 공식 Pokémon UI나 브랜드 자산 모방

대신 실제 콘텐츠, native-feeling list, typography, spacing, divider, 한 가지 action과 조용한 surface를 사용한다.
