import type { MockCard } from "./moment-storage";

export function CardArtwork({ card, compact = false }: { card: MockCard; compact?: boolean }) {
  return (
    <div
      aria-label={`${card.name} 카드 이미지`}
      className={`mock-card-art${compact ? " mock-card-art--compact" : ""}`}
      role="img"
      style={{ "--mock-card-color": card.color } as React.CSSProperties}
    >
      <span className="mock-card-art__set">Pokefolio</span>
      <span aria-hidden="true" className="mock-card-art__subject">
        {card.name.slice(0, 1)}
      </span>
      <span className="mock-card-art__name">{card.name}</span>
    </div>
  );
}
