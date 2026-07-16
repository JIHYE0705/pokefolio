# Pokefolio

Pokefolio는 포켓몬 카드 컬렉터가 카드를 모으고, 기록하고, 꾸미고, 교환하는 즐거움에 집중하는 모바일 우선 웹 서비스입니다.

> 현재 저장소는 구조와 개발 문서를 정리하는 단계입니다. 아래 기능과 기술 구성은 계획이며, 애플리케이션 코드는 아직 구현되지 않았습니다.

## 핵심 경험

- 내가 보유한 카드와 수량 확인
- 컬렉션, 위시리스트, 중복 카드 관리
- 카드 이미지 중심의 가상 바인더 꾸미기
- 팩 개봉일기와 획득 카드 기록
- 향후 취향 분석, 규칙 기반 추천, 카드 인식, 교환 지원

Pokefolio는 시세 조회나 투자 판단을 핵심 가치로 삼지 않습니다.

## 기술 방향

| 영역 | 계획 |
| --- | --- |
| Frontend | Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, npm |
| Backend | Python, FastAPI, SQLAlchemy 2.x typed declarative mapping, Alembic, Pydantic v2 |
| Local database | SQLite, PostgreSQL 이전 가능성을 고려한 설계 |
| Testing | Frontend 최소 unit/component/e2e 도구, Backend pytest |
| UI | 390px 모바일 우선 웹, 향후 PWA 지원 가능 구조 |
| Local development | 초기에는 Docker를 사용하지 않음 |

SQLModel은 사용하지 않으며 SQLAlchemy DB 모델과 Pydantic API 스키마를 분리합니다.

## 저장소 구조

```text
pokefolio/
├── frontend/             # 향후 Next.js 애플리케이션과 프런트엔드 테스트
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── lib/
│   ├── public/
│   └── tests/
├── backend/              # 향후 FastAPI 애플리케이션과 백엔드 테스트
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   └── services/
│   └── tests/
├── docs/                 # 제품, 설계, 계약, 개발 문서
├── scripts/              # 향후 반복 작업용 스크립트
├── AGENTS.md             # 저장소 작업 규칙
├── README.md
└── .gitignore
```

## 현재 개발 단계

- Phase 1 진행 중: Frontend 최소 scaffold와 모바일 공통 mock 레이아웃 구성
- Home, Collection, Binder, Opening Log route는 mock 데이터만 사용하며 API에 연결되지 않음
- Backend 애플리케이션, migration, 데이터베이스는 아직 없음
- 다음 단계는 공통 레이아웃 리뷰 후 화면별 mock UI 확장

## 문서 안내

| 문서 | 내용 |
| --- | --- |
| [PROJECT](docs/PROJECT.md) | 제품 비전, 사용자, MVP 범위, 성공 기준 |
| [ROADMAP](docs/ROADMAP.md) | Phase 0~8 목표와 완료 조건 |
| [DESIGN](docs/DESIGN.md) | 모바일 UI와 Apple HIG 적용 원칙 |
| [SCREENS](docs/SCREENS.md) | 화면별 목적, 상태, 흐름, 와이어프레임 |
| [ERD](docs/ERD.md) | 초기 엔티티와 관계 후보 |
| [API](docs/API.md) | HTTP API 계약 초안 |
| [CODING_RULES](docs/CODING_RULES.md) | Frontend/Backend 코딩 규칙 |
| [TESTING](docs/TESTING.md) | 테스트 범위와 검증 기준 |
| [DECISIONS](docs/DECISIONS.md) | 주요 기술·제품 결정 기록 |
| [PROMPTS](docs/PROMPTS.md) | 후속 Codex 작업 프롬프트 템플릿 |

저장소에서 작업하기 전 [AGENTS.md](AGENTS.md)와 작업 영역에 해당하는 문서를 먼저 확인합니다.
