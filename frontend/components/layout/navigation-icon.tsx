import type { SVGProps } from "react";

type IconName = "binder" | "collection" | "home" | "log";

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z" />,
  collection: (
    <>
      <rect height="14" rx="2" width="10" x="7" y="5" />
      <path d="M4 8v10a2 2 0 0 0 2 2M20 8v10a2 2 0 0 1-2 2" />
    </>
  ),
  binder: (
    <>
      <path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
      <path d="M9 4v16M12 8h4M12 12h4" />
    </>
  ),
  log: (
    <>
      <rect height="16" rx="2" width="14" x="5" y="5" />
      <path d="M8 3v4M16 3v4M8 10h8M8 14h5" />
    </>
  ),
};

export function NavigationIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
