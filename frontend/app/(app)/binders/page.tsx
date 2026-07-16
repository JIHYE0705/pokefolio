const slots = ["별빛", "숲", "", "물결", "", "온기", "", "", "달빛"] as const;

export default function BindersPage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <h1>바인더</h1>
      </header>

      <section aria-labelledby="favorite-binder" className="binder-card">
        <div className="binder-card__header">
          <h2 id="favorite-binder">최애 카드</h2>
          <p>5 / 9 slots</p>
        </div>
        <div aria-label="최애 카드 바인더 1페이지" className="binder-grid">
          {slots.map((slot, index) => (
            <div
              className={`binder-slot${slot ? " binder-slot--filled" : ""}`}
              key={`${slot}-${index}`}
              style={slot ? ({ "--slot-color": index % 2 ? "#e4f0ec" : "#e8e3fb" } as React.CSSProperties) : undefined}
            >
              {slot || "빈 슬롯"}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
