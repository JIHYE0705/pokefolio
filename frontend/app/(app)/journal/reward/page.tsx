"use client";

import Link from "next/link";

import { CardArtwork } from "@/features/journal/card-artwork";
import { momentTypeLabels } from "@/features/journal/moment-storage";
import { useMoment } from "@/features/journal/use-moment";
import { EmptyState, LoadingState } from "@/components/states/state-view";

export default function RewardPage() {
  const { moment, ready } = useMoment();

  if (!ready) return <LoadingState label="저장한 순간을 불러오는 중" />;
  if (!moment) return <EmptyState actionHref="/journal/new" actionLabel="순간 기록하기" description="먼저 오늘의 순간을 남겨주세요." title="저장된 순간이 없어요" />;

  return (
    <div className="reward-view page-enter">
      <div aria-hidden="true" className="reward-mark">✓</div>
      <div className="reward-copy">
        <p className="eyebrow">Saved to your journal</p>
        <h1>오늘의 순간이<br />기록됐어요.</h1>
        <time dateTime={moment.createdAt}>{new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(moment.createdAt))}</time>
      </div>
      {moment.card ? <CardArtwork card={moment.card} /> : null}
      <div className="reward-note">
        <strong>{momentTypeLabels[moment.type]}</strong>
        <p>{moment.note || "오늘의 마음을 조용히 남겼어요."}</p>
      </div>
      <div className="reward-actions">
        <Link className="primary-button" href={`/journal/${moment.id}`}>기록 다시 보기</Link>
        <Link className="secondary-button" href="/">홈에서 만나기</Link>
      </div>
    </div>
  );
}
