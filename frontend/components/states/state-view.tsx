import Link from "next/link";

type StateActionProps = {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  title: string;
};

type StateFrameProps = StateActionProps & {
  role?: "alert";
  symbol: string;
};

function StateFrame({
  actionHref,
  actionLabel,
  description,
  role,
  symbol,
  title,
}: StateFrameProps) {
  return (
    <section className="state-view" role={role}>
      <span aria-hidden="true" className="state-view__symbol">
        {symbol}
      </span>
      <h2 className="state-view__title">{title}</h2>
      <p className="state-view__description">{description}</p>
      {actionHref && actionLabel ? (
        <Link className="state-view__action" href={actionHref}>
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <section aria-label={label} className="state-view state-view--loading" role="status">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="state-view__skeletons">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

export function EmptyState(props: StateActionProps) {
  return <StateFrame {...props} symbol="＋" />;
}

export function ErrorState(props: StateActionProps) {
  return <StateFrame {...props} role="alert" symbol="!" />;
}
