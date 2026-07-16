const cards = [
  { color: "#e9e4fb", mark: "S", name: "별빛 카드", note: "샘플 세트 · 2장" },
  { color: "#e5f1ec", mark: "F", name: "숲의 카드", note: "샘플 세트 · 1장" },
  { color: "#f8ebdf", mark: "W", name: "따뜻한 카드", note: "샘플 세트 · 3장" },
  { color: "#e4eef8", mark: "M", name: "물결 카드", note: "샘플 세트 · 1장" },
] as const;

export default function CollectionPage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <h1>컬렉션</h1>
      </header>

      <section aria-labelledby="owned-cards" className="section-block">
        <h2 className="section-heading" id="owned-cards">
          보유 카드 128장
        </h2>
        <div className="card-grid">
          {cards.map((card) => (
            <article className="collectible-card" key={card.name}>
              <div
                aria-label={`${card.name} 이미지 자리`}
                className="collectible-card__art"
                role="img"
                style={{ "--card-color": card.color } as React.CSSProperties}
              />
              <h2>{card.name}</h2>
              <p>{card.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
