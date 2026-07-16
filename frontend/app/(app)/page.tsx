const recentActivity = [
  { mark: "S", name: "별빛 카드", note: "오늘 컬렉션에 추가" },
  { mark: "L", name: "연보라 카드", note: "최애 바인더에 배치" },
] as const;

export default function HomePage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <h1>나의 수집 앨범</h1>
      </header>

      <section aria-labelledby="collection-summary" className="section-block">
        <h2 className="sr-only" id="collection-summary">컬렉션 요약</h2>
        <div className="summary-row">
          <div className="summary-item">
            <p className="summary-card__label">보유 카드</p>
            <p className="summary-card__value">128</p>
            <p className="summary-card__note">서로 다른 카드 92장</p>
          </div>
          <div className="summary-item">
            <p className="summary-card__label">중복 카드</p>
            <p className="summary-card__value">12</p>
            <p className="summary-card__note">교환 준비 중</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="recent-activity" className="section-block">
        <h2 className="section-heading" id="recent-activity">
          최근 컬렉션
        </h2>
        <ul className="activity-list">
          {recentActivity.map((item) => (
            <li className="activity-item" key={item.name}>
              <span aria-hidden="true" className="activity-art" />
              <div className="item-copy">
                <strong>{item.name}</strong>
                <span>{item.note}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
