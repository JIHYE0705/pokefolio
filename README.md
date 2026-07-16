# Pokefolio

Pokefolio는 Pokémon TCG 컬렉션을 기록하고 관리하는 모바일 우선 포트폴리오 서비스입니다.

현재 저장소는 프로젝트 구조와 문서만 준비한 초기 단계입니다. 애플리케이션 코드, 패키지 설정, 데이터베이스 파일은 아직 포함하지 않습니다.

## 목표

- 카드 컬렉션 관리
- 팩 개봉 기록
- 바인더 구성 지원
- 교환 후보 제안
- 컬렉션 인사이트 제공

## 기술 방향

- 프런트엔드: Next.js, Mobile First
- 백엔드: Python, FastAPI
- 데이터베이스: SQLite
- 저장소 구성: Monorepo

세부 기술 선택과 구현 원칙은 [`docs/PROJECT.md`](docs/PROJECT.md), 단계별 계획은 [`docs/ROADMAP.md`](docs/ROADMAP.md)에서 관리합니다.

## 프로젝트 구조

```text
pokefolio/
├── frontend/
│   ├── app/          # Next.js App Router 화면과 라우트
│   ├── components/   # 공용 UI 컴포넌트
│   ├── features/     # 도메인별 프런트엔드 기능
│   ├── lib/          # API 클라이언트와 공용 유틸리티
│   ├── public/       # 정적 파일
│   └── tests/        # 프런트엔드 테스트
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI 엔드포인트
│   │   ├── core/         # 설정과 공통 기반 코드
│   │   ├── db/           # SQLite 연결과 세션 관리
│   │   ├── models/       # 데이터베이스 모델
│   │   ├── repositories/ # 데이터 접근 계층
│   │   ├── schemas/      # 요청과 응답 스키마
│   │   └── services/     # 비즈니스 로직
│   └── tests/            # 백엔드 테스트
├── docs/
│   ├── PROJECT.md    # 프로젝트 범위와 아키텍처 방향
│   └── ROADMAP.md    # 단계별 개발 계획
├── AGENTS.md         # 저장소 작업 지침
├── README.md
└── .gitignore
```

## 현재 상태

- 모노레포 폴더 구조 설계 및 생성
- 프로젝트 문서 작성
- 구현 및 의존성 설치 전
