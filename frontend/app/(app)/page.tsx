"use client";

import Link from "next/link";

import { LoadingState } from "@/components/states/state-view";
import { CardArtwork } from "@/features/journal/card-artwork";
import { momentTypeLabels } from "@/features/journal/moment-storage";
import { useMoment } from "@/features/journal/use-moment";

export default function HomePage() {
  const { moment, ready } = useMoment();

  if (!ready) return <LoadingState label="홈을 불러오는 중" />;

  return (
    <div className="home-view page-enter">
      <header className="home-greeting">
        <p>7월의 Pokefolio</p>
        <h1>{moment ? "오늘의 기억을\n다시 만나보세요." : "오늘의 설렘을\n남겨보세요."}</h1>
      </header>

      {moment ? (
        <>
          <section aria-labelledby="today-moment" className="home-section">
            <div className="section-title-row">
              <h2 id="today-moment">오늘 기록한 순간</h2>
              <Link href={`/journal/${moment.id}`}>전체 보기</Link>
            </div>
            <Link className="home-moment" href={`/journal/${moment.id}`}>
              {moment.hasPhoto ? <div aria-hidden="true" className="home-moment__photo"><span>오늘의 장면</span></div> : null}
              <div className="home-moment__copy">
                <span>{momentTypeLabels[moment.type]}</span>
                {moment.note ? <strong>{moment.note}</strong> : null}
                <time dateTime={moment.createdAt}>오늘</time>
              </div>
            </Link>
          </section>

          {moment.card ? (
            <section aria-labelledby="today-card" className="home-section">
              <div className="section-title-row"><h2 id="today-card">오늘의 카드</h2></div>
              <Link className="today-card-row" href={`/journal/${moment.id}`}>
                <CardArtwork card={moment.card} compact />
                <div><strong>{moment.card.name}</strong><span>{moment.card.set} · {moment.card.number}</span></div>
                <span aria-hidden="true" className="chevron">›</span>
              </Link>
            </section>
          ) : null}
        </>
      ) : (
        <section className="home-empty">
          <div aria-hidden="true" className="home-empty__art"><span>♡</span></div>
          <p>아직 오늘의 순간이 없어요.</p>
          <h2>첫 번째 기억은<br />어떤 장면인가요?</h2>
          <Link className="primary-button" href="/journal/new">첫 순간 기록하기</Link>
        </section>
      )}

    </div>
  );
}
