"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CardArtwork } from "@/features/journal/card-artwork";
import {
  mockCards,
  momentTypeLabels,
  type MomentType,
} from "@/features/journal/moment-storage";
import { useMoment } from "@/features/journal/use-moment";

const typeIcons: Record<MomentType, string> = {
  "opened-pack": "□",
  "brought-home": "◇",
  "gifted-traded": "♡",
  special: "✦",
};

export default function CreateMomentPage() {
  const router = useRouter();
  const { save } = useMoment();
  const [type, setType] = useState<MomentType | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [note, setNote] = useState("");
  const composeHeadingRef = useRef<HTMLHeadingElement>(null);
  const selectedCard = mockCards.find((card) => card.id === cardId) ?? null;

  useEffect(() => {
    if (type) composeHeadingRef.current?.focus();
  }, [type]);

  function submitMoment() {
    if (!type) return;
    save({
      id: `moment-${Date.now()}`,
      type,
      createdAt: new Date().toISOString(),
      note: note.trim(),
      card: selectedCard,
      hasPhoto,
    });
    router.push("/journal/reward");
  }

  if (!type) {
    return (
      <div className="create-flow page-enter">
        <header className="flow-header">
          <Link href="/journal">취소</Link>
          <span>오늘의 순간</span>
          <span aria-hidden="true" />
        </header>
        <div className="flow-intro">
          <p className="step-label">1 · 순간 고르기</p>
          <h1>오늘 어떤 순간을<br />기억하고 싶나요?</h1>
        </div>
        <div className="type-list">
          {(Object.keys(momentTypeLabels) as MomentType[]).map((value) => (
            <button className="type-button" key={value} onClick={() => setType(value)} type="button">
              <span aria-hidden="true">{typeIcons[value]}</span>
              {momentTypeLabels[value]}
              <span aria-hidden="true" className="chevron">›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="create-flow page-enter">
      <header className="flow-header">
        <button className="text-button" onClick={() => setType(null)} type="button">이전</button>
        <span>오늘의 순간</span>
        <Link href="/journal">취소</Link>
      </header>

      <section className="selected-type">
        <span aria-hidden="true">{typeIcons[type]}</span>
        <strong>{momentTypeLabels[type]}</strong>
        <button onClick={() => setType(null)} type="button">변경</button>
      </section>

      <section className="compose-section">
        <div className="flow-intro">
          <p className="step-label">2 · 장면 남기기</p>
          <h1 ref={composeHeadingRef} tabIndex={-1}>사진이나 카드를<br />남겨보세요.</h1>
          <p>없어도 괜찮아요.</p>
        </div>

        <button
          aria-pressed={hasPhoto}
          className={`photo-picker${hasPhoto ? " photo-picker--selected" : ""}`}
          onClick={() => setHasPhoto((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className="photo-picker__art">{hasPhoto ? "✓" : "+"}</span>
          <span><strong>{hasPhoto ? "오늘의 사진을 골랐어요" : "사진 추가"}</strong><small>샘플 사진으로 미리보기</small></span>
        </button>

        <fieldset className="card-picker">
          <legend>오늘의 카드 <span>선택</span></legend>
          <div className="card-picker__grid">
            {mockCards.map((card) => (
              <button
                aria-pressed={cardId === card.id}
                className="card-choice"
                key={card.id}
                onClick={() => setCardId(cardId === card.id ? null : card.id)}
                type="button"
              >
                {cardId === card.id ? <span aria-hidden="true" className="card-choice__check">✓</span> : null}
                <CardArtwork card={card} />
                <strong>{card.name}</strong>
                <small>{card.number}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <label className="note-field">
          <span>한 줄 남기기 <small>선택</small></span>
          <textarea
            maxLength={80}
            onChange={(event) => setNote(event.target.value)}
            placeholder="그 순간의 마음을 적어보세요."
            rows={3}
            value={note}
          />
          <small>{note.length} / 80</small>
        </label>
      </section>

      <button className="primary-button sticky-action" onClick={submitMoment} type="button">기억 남기기</button>
    </div>
  );
}
