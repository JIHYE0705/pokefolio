# Pokefolio API 초안

이 문서는 구현 전 HTTP/JSON 계약 초안이다. 실제 endpoint, status code, pagination은 scaffold와 카드 데이터 제공자를 정한 뒤 테스트로 확정한다.

## 공통 규칙

- Base path 후보: `/api/v1`
- Content type: `application/json`
- 날짜·시각: ISO 8601, 시각은 UTC
- ID: 예시에서는 integer를 사용하나 최종 전략은 미결정이다.
- request/response는 별도 Pydantic v2 스키마로 검증한다.
- DB 모델을 응답으로 직접 직렬화하지 않는다.

### 오류 응답

```json
{
  "error": {
    "code": "validation_error",
    "message": "요청 값을 확인해 주세요.",
    "details": [
      {"field": "quantity", "reason": "must_be_greater_than_zero"}
    ],
    "request_id": "req_example"
  }
}
```

| Status | 사용 |
| --- | --- |
| `400` | 형식은 유효하지만 수행할 수 없는 요청 |
| `404` | 리소스를 찾을 수 없음 |
| `409` | unique constraint, 점유 슬롯 등 현재 상태와 충돌 |
| `422` | Pydantic validation 실패 |
| `500` | 예상하지 못한 서버 오류; 내부 상세는 노출하지 않음 |

## Health

### `GET /api/v1/health`

서비스의 기본 생존 상태를 확인한다.

Request body: 없음.

Response `200`

```json
{"status": "ok"}
```

오류: 준비 상태 점검을 별도 endpoint로 분리할지 결정하기 전까지 예상하지 못한 장애는 공통 `500`을 사용한다.

## Cards

### `GET /api/v1/cards`

카드를 검색·필터링한다.

Query 예시: `?query=pikachu&set_code=sv&limit=20&cursor=next_token`

Response `200`

```json
{
  "items": [
    {
      "id": 101,
      "name": "Pikachu",
      "set_code": "sv-example",
      "set_name": "Example Set",
      "collector_number": "025/100",
      "rarity": "Rare",
      "image_url": "https://images.example/cards/101.webp"
    }
  ],
  "next_cursor": null
}
```

오류: 잘못된 limit은 `422`, 지원하지 않는 filter 조합은 `400`, 서버 오류는 `500`.

### `GET /api/v1/cards/{card_id}`

카드 상세와 화면에 필요한 카탈로그 정보를 조회한다.

Response `200`

```json
{
  "id": 101,
  "name": "Pikachu",
  "set_code": "sv-example",
  "set_name": "Example Set",
  "collector_number": "025/100",
  "rarity": "Rare",
  "image_url": "https://images.example/cards/101.webp"
}
```

오류: 존재하지 않는 card는 `404`, 서버 오류는 `500`.

## User cards

### `GET /api/v1/user-cards`

보유 카드를 검색·필터링한다.

Query 예시: `?query=pikachu&duplicates_only=true&limit=20`

Response `200`

```json
{
  "items": [
    {
      "id": 501,
      "card": {"id": 101, "name": "Pikachu", "image_url": "https://images.example/cards/101.webp"},
      "condition": "near_mint",
      "finish": "normal",
      "language": "ko",
      "quantity": 2,
      "note": "첫 개봉 카드"
    }
  ],
  "next_cursor": null
}
```

오류: query validation은 `422`, 서버 오류는 `500`.

### `POST /api/v1/user-cards`

카드를 내 컬렉션에 추가한다.

Request

```json
{
  "card_id": 101,
  "condition": "near_mint",
  "finish": "normal",
  "language": "ko",
  "quantity": 1,
  "note": "첫 개봉 카드"
}
```

Response `201`: 생성된 UserCard를 `GET /user-cards` item과 같은 형태로 반환한다.

오류: card 없음 `404`, 같은 속성 row 충돌 `409`, quantity·enum validation `422`.

### `PATCH /api/v1/user-cards/{user_card_id}`

수량, 상태, 언어, finish, 메모를 수정한다.

Request

```json
{"quantity": 3, "note": "한 장은 교환 가능"}
```

Response `200`: 갱신된 UserCard.

오류: 없음 `404`, 다른 row와 unique 충돌 `409`, validation `422`.

### `DELETE /api/v1/user-cards/{user_card_id}`

보유 카드 row를 제거한다.

Response `204`: body 없음.

오류: 없음 `404`, BinderSlot에서 사용 중 `409`.

## Wishlist

### `GET /api/v1/wishlist`

위시리스트를 조회한다.

Response `200`

```json
{
  "items": [
    {
      "id": 701,
      "card": {"id": 202, "name": "Example Card", "image_url": null},
      "desired_quantity": 1,
      "priority": 1,
      "note": "바인더 마지막 칸"
    }
  ]
}
```

오류: 서버 오류 `500`.

### `POST /api/v1/wishlist`

카드를 위시리스트에 추가한다.

Request

```json
{"card_id": 202, "desired_quantity": 1, "priority": 1, "note": "바인더 마지막 칸"}
```

Response `201`: 생성된 WishlistItem.

오류: card 없음 `404`, 이미 등록됨 `409`, validation `422`.

### `PATCH /api/v1/wishlist/{wishlist_item_id}`

원하는 수량, 우선순위, 메모를 수정한다.

Request

```json
{"desired_quantity": 2, "priority": 2}
```

Response `200`: 갱신된 WishlistItem.

오류: 없음 `404`, validation `422`.

### `DELETE /api/v1/wishlist/{wishlist_item_id}`

위시리스트에서 제거한다. Response `204`, 없음 `404`.

## Binders

### `GET /api/v1/binders`

바인더 목록을 조회한다.

Response `200`

```json
{
  "items": [
    {"id": 801, "name": "최애 카드", "description": null, "filled_slots": 5, "total_slots": 9, "updated_at": "2026-07-16T02:00:00Z"}
  ]
}
```

오류: 서버 오류 `500`.

### `POST /api/v1/binders`

바인더와 첫 페이지를 생성한다.

Request

```json
{"name": "최애 카드", "description": "가장 좋아하는 카드", "layout": "3x3"}
```

Response `201`

```json
{"id": 801, "name": "최애 카드", "description": "가장 좋아하는 카드", "page_count": 1}
```

오류: 지원하지 않는 layout `422`, transaction 실패 `500`.

### `GET /api/v1/binders/{binder_id}`

바인더 기본 정보와 페이지 요약을 조회한다.

Response `200`

```json
{
  "id": 801,
  "name": "최애 카드",
  "description": "가장 좋아하는 카드",
  "pages": [{"id": 901, "page_number": 1, "layout": "3x3", "filled_slots": 5}]
}
```

오류: 없음 `404`.

### `PATCH /api/v1/binders/{binder_id}`

바인더 이름, 설명, cover 후보를 수정한다.

Request

```json
{"name": "최애 카드 모음", "cover_card_id": 101}
```

Response `200`: 갱신된 바인더. 오류: binder/card 없음 `404`, validation `422`.

### `DELETE /api/v1/binders/{binder_id}`

바인더와 페이지·슬롯을 삭제한다. Response `204`, 없음 `404`.

## Binder pages and slots

### `POST /api/v1/binders/{binder_id}/pages`

마지막에 새 페이지와 빈 슬롯을 추가한다.

Request

```json
{"layout": "3x3"}
```

Response `201`

```json
{"id": 902, "binder_id": 801, "page_number": 2, "layout": "3x3"}
```

오류: binder 없음 `404`, layout validation `422`, 동시 페이지 번호 충돌 `409`.

### `GET /api/v1/binder-pages/{page_id}`

페이지와 슬롯을 조회한다.

Response `200`

```json
{
  "id": 901,
  "page_number": 1,
  "layout": "3x3",
  "slots": [
    {"id": 1001, "position": 0, "user_card": {"id": 501, "card_id": 101, "name": "Pikachu", "image_url": "https://images.example/cards/101.webp"}},
    {"id": 1002, "position": 1, "user_card": null}
  ]
}
```

오류: 없음 `404`.

### `PUT /api/v1/binder-pages/{page_id}/slots/{position}`

슬롯에 보유 카드를 배치하거나 교체한다.

Request

```json
{"user_card_id": 501}
```

Response `200`

```json
{"id": 1001, "position": 0, "user_card_id": 501}
```

오류: page/UserCard 없음 `404`, position 범위 밖 `422`, 배치 정책 충돌 `409`.

### `DELETE /api/v1/binder-pages/{page_id}/slots/{position}`

슬롯을 비운다. 슬롯 row는 유지하고 `user_card_id`만 제거한다.

Response `204`. 오류: page/position 없음 `404`.

## Opening logs

### `GET /api/v1/opening-logs`

개봉일기를 최신순으로 조회한다.

Query 예시: `?limit=20&cursor=next_token`

Response `200`

```json
{
  "items": [
    {"id": 1101, "opened_on": "2026-07-16", "title": "오늘의 첫 팩", "set_name": "Example Set", "card_count": 5}
  ],
  "next_cursor": null
}
```

오류: query validation `422`, 서버 오류 `500`.

### `POST /api/v1/opening-logs`

개봉일기와 획득 카드를 원자적으로 생성한다.

Request

```json
{
  "opened_on": "2026-07-16",
  "title": "오늘의 첫 팩",
  "set_name": "Example Set",
  "note": "기대하던 카드를 얻었다.",
  "cards": [
    {"card_id": 101, "quantity": 1},
    {"card_id": 202, "quantity": 4}
  ]
}
```

Response `201`

```json
{"id": 1101, "opened_on": "2026-07-16", "title": "오늘의 첫 팩", "set_name": "Example Set", "note": "기대하던 카드를 얻었다.", "cards": [{"card_id": 101, "quantity": 1}, {"card_id": 202, "quantity": 4}]}
```

오류: card 없음 `404`, 중복 card row 정책 충돌 `409`, 날짜·quantity validation `422`, transaction 실패 `500`.

### `GET /api/v1/opening-logs/{opening_log_id}`

개봉일기 상세와 획득 카드 정보를 조회한다.

Response `200`: 생성 응답의 카드 항목에 이름과 이미지 URL을 포함한다.

오류: 없음 `404`.

### `PATCH /api/v1/opening-logs/{opening_log_id}`

개봉일기 메타데이터와 카드 목록을 수정한다. 카드 목록을 보내면 전체 교체하는 초안이다.

Request

```json
{"title": "기억에 남는 첫 팩", "cards": [{"card_id": 101, "quantity": 2}]}
```

Response `200`: 갱신된 상세. 오류: log/card 없음 `404`, 충돌 `409`, validation `422`.

### `DELETE /api/v1/opening-logs/{opening_log_id}`

개봉일기와 연결 항목을 삭제한다. Response `204`, 없음 `404`.

## 미결정 사항

- cursor와 offset pagination 중 기본 방식
- PATCH의 명시적 `null`과 미전달 필드 처리 규칙
- UserCard 수량 감소가 BinderSlot 배치와 충돌할 때의 정책
- OpeningLog 생성 시 UserCard를 자동 갱신할지
- bulk 카드 등록 endpoint 필요 여부
- ETag 또는 version을 이용한 동시 수정 충돌 처리
- API 인증 도입 시 단일 사용자 데이터 이전과 path 변화
