# Quiet Collection Album Design

## Goal

Pokefolio의 기능, 라우팅, mock 데이터 구조를 유지하면서 전형적인 AI 생성 UI의 카드·장식 중심 표현을 제거하고, 390px 모바일 화면에서 카드 이미지와 기록이 먼저 보이는 조용한 수집 앨범으로 정리한다.

## Direction

- 흰색 캔버스를 기본으로 사용하고 여백, 타이포그래피, 구분선으로 영역을 나눈다.
- 보라색은 현재 선택 상태, 핵심 CTA, 포커스 표시에만 사용한다.
- 그림자는 바인더 포켓처럼 물리적 계층을 표현할 때만 약하게 사용한다.
- pill은 필터나 segmented control에만 허용하며 현재 화면에는 새 pill을 만들지 않는다.
- Apple HIG의 clarity, deference, safe area, 44px touch target 원칙을 따른다.
- 실제 카드 이미지가 없는 mock 단계에서는 기존 색상과 문자 데이터를 사용한 절제된 카드 placeholder를 유지하되 장식 원형과 glow를 만들지 않는다.

## Screen Changes

### Common shell

- App Bar의 영문 eyebrow를 제거하고 한 줄짜리 브랜드 표시로 축소한다.
- Bottom Navigation의 선택 pill을 제거하고 색상과 아이콘으로만 현재 위치를 알린다.
- 시스템 글꼴을 명시적으로 사용하고 제목의 과장된 크기와 굵기를 낮춘다.

### Home

- 두 개의 통계 카드를 하나의 간결한 텍스트 요약 행으로 바꾼다.
- 최근 활동은 독립 카드 대신 대표 카드 썸네일과 구분선으로 연결된 목록으로 표현한다.
- 반복 설명문은 제거하고 최근 컬렉션과 다음 행동이 먼저 읽히게 한다.

### Collection

- 카드 이미지 영역을 가장 크게 유지한다.
- 이미지 placeholder의 원형 장식과 그림자를 제거한다.
- 카드 사이의 위계는 이미지, 이름, 보유 정보만으로 만든다.

### Binder

- 바인더를 감싼 흰색 surface card를 제거한다.
- 3×3 페이지 면을 화면의 주인공으로 만들고 포켓은 얇은 경계와 최소 깊이만 사용한다.

### Opening Log

- 각 기록의 surface card를 제거하고 hairline 구분선 목록으로 바꾼다.
- 숫자 타일 대신 카드 비율 대표 썸네일을 사용한다.

### Shared states

- 상태 전체를 감싼 카드, 원형 장식, pill CTA를 제거한다.
- 제목, 설명, 표준 radius CTA 또는 단순 skeleton으로 상태를 전달한다.

## Constraints

- 기능, 라우팅, mock 데이터 값과 구조를 변경하지 않는다.
- 새로운 디자인 라이브러리나 dependency를 추가하지 않는다.
- 공식 포켓몬 UI 또는 브랜드 자산을 모방하지 않는다.
- loading, empty, error, success 상태와 접근성 의미 구조를 유지한다.

## Verification

- 390px viewport에서 네 라우트와 공통 상태를 직접 확인한다.
- 가능하면 스크린샷을 남긴다.
- 768px에서 레이아웃이 과도하게 늘어나지 않는지 확인한다.
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`를 실행한다.
