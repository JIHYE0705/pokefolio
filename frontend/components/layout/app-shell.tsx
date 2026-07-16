import type { ReactNode } from "react";

import { AppBar } from "./app-bar";
import { BottomNavigation } from "./bottom-navigation";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <AppBar />
      <main className="app-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
