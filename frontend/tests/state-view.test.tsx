import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState, ErrorState, LoadingState } from "@/components/states/state-view";

describe("shared states", () => {
  it("announces loading with an accessible name", () => {
    render(<LoadingState label="컬렉션 불러오는 중" />);

    expect(screen.getByRole("status", { name: "컬렉션 불러오는 중" })).toBeInTheDocument();
  });

  it("explains an empty state and offers the next action", () => {
    render(
      <EmptyState
        actionHref="/collection"
        actionLabel="컬렉션 보기"
        description="첫 카드를 추가해 나만의 앨범을 시작해 보세요."
        title="아직 카드가 없어요"
      />,
    );

    expect(screen.getByRole("heading", { name: "아직 카드가 없어요" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "컬렉션 보기" })).toHaveAttribute(
      "href",
      "/collection",
    );
  });

  it("exposes errors as alerts and provides a recovery action", () => {
    render(
      <ErrorState
        actionHref="/"
        actionLabel="홈으로 돌아가기"
        description="잠시 후 다시 시도해 주세요."
        title="다시 불러오지 못했어요"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("다시 불러오지 못했어요");
    expect(screen.getByRole("link", { name: "홈으로 돌아가기" })).toHaveAttribute("href", "/");
  });
});
