"use client";

import Link from "next/link";

import { CardArtwork } from "@/features/journal/card-artwork";
import { momentTypeLabels } from "@/features/journal/moment-storage";
import { useMoment } from "@/features/journal/use-moment";
import { LoadingState } from "@/components/states/state-view";

function formatMomentDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function JournalPage() {
  const { moment, ready, reset } = useMoment();

  if (!ready) return <LoadingState label="저널을 불러오는 중" />;

  if (!moment) {
    return (
      <div className="journal-empty page-enter">
        <div aria-hidden="true" className="journal-empty__symbol">♡</div>
        <div>
          <p className="eyebrow">Collection Journal</p>
          <h1>첫 번째 추억을<br />만들어보세요.</h1>
          <p>팩을 열었거나 오늘 카드를 만났다면,<br />그 순간을 가볍게 남겨보세요.</p>
        </div>
        <Link className="primary-button" href="/journal/new">첫 순간 기록하기</Link>
      </div>
    );
  }

  return (
    <div className="page-stack page-enter">
      <header className="title-row">
        <div>
          <p className="eyebrow">Collection Journal</p>
          <h1>나의 순간</h1>
        </div>
        <Link aria-label="새 순간 기록하기" className="circle-button" href="/journal/new">＋</Link>
      </header>

      <section aria-labelledby="journal-timeline" className="timeline-section">
        <h2 className="section-heading" id="journal-timeline">최근 기록</h2>
        <Link className="moment-row" href={`/journal/${moment.id}`}>
          {moment.card ? <CardArtwork card={moment.card} compact /> : (
            <div aria-hidden="true" className="moment-row__photo">♡</div>
          )}
          <div className="moment-row__copy">
            <time dateTime={moment.createdAt}>{formatMomentDate(moment.createdAt)}</time>
            <strong>{momentTypeLabels[moment.type]}</strong>
            {moment.note ? <span>{moment.note}</span> : null}
          </div>
          <span aria-hidden="true" className="chevron">›</span>
        </Link>
      </section>

      <section aria-labelledby="prototype-tools" className="prototype-tools">
        <h2 id="prototype-tools">프로토타입</h2>
        <button onClick={reset} type="button">데모 데이터 초기화</button>
      </section>
    </div>
  );
}
