const recentActivity = [
  { mark: "S", name: "별빛 카드", note: "오늘 컬렉션에 추가" },
  { mark: "L", name: "연보라 카드", note: "최애 바인더에 배치" },
] as const;

export default function HomePage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <h1>나의 수집 앨범</h1>
        <p>모아둔 카드와 최근 기록을 가볍게 둘러보세요.</p>
      </header>

      <section aria-labelledby="collection-summary" className="section-block">
        <h2 className="section-heading" id="collection-summary">
          컬렉션 요약
        </h2>
        <div className="summary-grid">
          <article className="summary-card surface-card">
            <p className="summary-card__label">보유 카드</p>
            <p className="summary-card__value">128</p>
            <p className="summary-card__note">서로 다른 카드 92장</p>
          </article>
          <article className="summary-card surface-card">
            <p className="summary-card__label">중복 카드</p>
            <p className="summary-card__value">12</p>
            <p className="summary-card__note">교환 준비 중</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="recent-activity" className="section-block">
        <h2 className="section-heading" id="recent-activity">
          최근 활동
        </h2>
        <ul className="activity-list">
          {recentActivity.map((item) => (
            <li className="activity-item surface-card" key={item.name}>
              <span aria-hidden="true" className="activity-art">
                {item.mark}
              </span>
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
