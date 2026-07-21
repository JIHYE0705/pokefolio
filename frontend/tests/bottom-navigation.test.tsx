import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BottomNavigation } from "@/components/layout/bottom-navigation";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

describe("BottomNavigation", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/collection");
  });

  it("offers the four primary destinations", () => {
    render(<BottomNavigation />);

    expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "홈" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "컬렉션" })).toHaveAttribute(
      "href",
      "/collection",
    );
    expect(screen.getByRole("link", { name: "바인더" })).toHaveAttribute("href", "/binders");
    expect(screen.getByRole("link", { name: "저널" })).toHaveAttribute("href", "/journal");
  });

  it("marks the current destination semantically", () => {
    render(<BottomNavigation />);

    expect(screen.getByRole("link", { name: "컬렉션" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "홈" })).not.toHaveAttribute("aria-current");
  });
});
