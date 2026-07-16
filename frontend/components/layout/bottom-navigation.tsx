"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationIcon } from "./navigation-icon";

const destinations = [
  { href: "/", icon: "home", label: "홈" },
  { href: "/collection", icon: "collection", label: "컬렉션" },
  { href: "/binders", icon: "binder", label: "바인더" },
  { href: "/opening-logs", icon: "log", label: "개봉일기" },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴" className="bottom-navigation">
      <div className="bottom-navigation__inner">
        {destinations.map(({ href, icon, label }) => {
          const isCurrent = href === "/" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              aria-current={isCurrent ? "page" : undefined}
              className="bottom-navigation__link"
              href={href}
              key={href}
            >
              <span className="bottom-navigation__icon">
                <NavigationIcon height="22" name={icon} width="22" />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
