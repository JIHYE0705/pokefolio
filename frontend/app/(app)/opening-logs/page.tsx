const logs = [
  { cards: "5장", date: "2026-07-16", mark: "5", note: "기대하던 카드를 만난 날", title: "오늘의 첫 팩" },
  { cards: "3장", date: "2026-07-02", mark: "3", note: "친구와 함께 기록", title: "주말 개봉" },
  { cards: "7장", date: "2026-06-21", mark: "7", note: "새 세트를 시작한 날", title: "여름 앨범" },
] as const;

export default function OpeningLogsPage() {
  return (
    <div className="page-stack">
      <header className="page-heading">
        <h1>개봉일기</h1>
      </header>

      <section aria-labelledby="recent-logs" className="section-block">
        <h2 className="section-heading" id="recent-logs">
          최근 기록
        </h2>
        <ol className="opening-list">
          {logs.map((log) => (
            <li className="opening-item" key={`${log.date}-${log.title}`}>
              <span aria-hidden="true" className="opening-art" />
              <div className="item-copy">
                <time dateTime={log.date}>{log.date}</time>
                <strong>{log.title}</strong>
                <span>
                  {log.note} · {log.cards}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
