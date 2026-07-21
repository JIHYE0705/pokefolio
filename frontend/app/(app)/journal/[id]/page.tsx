"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { EmptyState, LoadingState } from "@/components/states/state-view";
import { CardArtwork } from "@/features/journal/card-artwork";
import { momentTypeLabels } from "@/features/journal/moment-storage";
import { useMoment } from "@/features/journal/use-moment";

export default function MomentDetailPage() {
  const params = useParams<{ id: string }>();
  const { moment, ready } = useMoment();

  if (!ready) return <LoadingState label="순간을 불러오는 중" />;
  if (!moment || moment.id !== params.id) return <EmptyState actionHref="/journal" actionLabel="저널로 돌아가기" description="초기화되었거나 존재하지 않는 기록이에요." title="이 순간을 찾을 수 없어요" />;

  return (
    <article className="moment-detail page-enter">
      <header className="flow-header">
        <Link href="/journal">‹ 저널</Link>
        <span>오늘의 순간</span>
        <span aria-hidden="true" />
      </header>
      <div className="moment-detail__date">
        <time dateTime={moment.createdAt}>{new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(new Date(moment.createdAt))}</time>
        <h1>{momentTypeLabels[moment.type]}</h1>
      </div>
      {moment.hasPhoto ? <div aria-label="오늘 선택한 사진" className="moment-photo" role="img"><span>오늘의 장면</span></div> : null}
      {moment.card ? (
        <section aria-labelledby="detail-card" className="detail-card-section">
          <h2 id="detail-card">오늘의 카드</h2>
          <CardArtwork card={moment.card} />
          <div><strong>{moment.card.name}</strong><span>{moment.card.set} · {moment.card.number}</span></div>
        </section>
      ) : null}
      {moment.note ? (
        <section aria-labelledby="detail-note" className="detail-note">
          <h2 id="detail-note">그날의 한 줄</h2>
          <p>{moment.note}</p>
        </section>
      ) : null}
    </article>
  );
}
