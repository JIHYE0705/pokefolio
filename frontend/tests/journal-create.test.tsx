import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

import CreateMomentPage from "@/app/(app)/journal/new/page";
import { loadMoment } from "@/features/journal/moment-storage";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

beforeEach(() => {
  window.localStorage.clear();
  push.mockClear();
});

it("saves one Moment and opens the reward screen", () => {
  render(<CreateMomentPage />);

  fireEvent.click(screen.getByRole("button", { name: /카드를 데려왔어요/ }));
  fireEvent.click(screen.getByRole("button", { name: /보랏빛 저녁/ }));
  fireEvent.change(screen.getByLabelText(/한 줄 남기기/), {
    target: { value: "오래 기다린 카드를 데려온 날" },
  });
  fireEvent.click(screen.getByRole("button", { name: "기억 남기기" }));

  expect(loadMoment(window.localStorage)).toMatchObject({
    type: "brought-home",
    note: "오래 기다린 카드를 데려온 날",
    card: { id: "violet-card" },
  });
  expect(push).toHaveBeenCalledWith("/journal/reward");
});

it("shows a check when a card is selected", () => {
  render(<CreateMomentPage />);

  fireEvent.click(screen.getByRole("button", { name: /카드를 데려왔어요/ }));
  const card = screen.getByRole("button", { name: /보랏빛 저녁/ });
  fireEvent.click(card);

  expect(card).toHaveAttribute("aria-pressed", "true");
  expect(within(card).getByText("✓")).toBeInTheDocument();
});

it("moves focus to the compose heading after selecting a Moment type", () => {
  render(<CreateMomentPage />);

  fireEvent.click(screen.getByRole("button", { name: /카드를 데려왔어요/ }));

  expect(screen.getByRole("heading", { name: /사진이나 카드를/ })).toHaveFocus();
});

it("uses product-facing copy for the mock photo", () => {
  render(<CreateMomentPage />);

  fireEvent.click(screen.getByRole("button", { name: /카드를 데려왔어요/ }));

  expect(screen.getByText("샘플 사진으로 미리보기")).toBeInTheDocument();
  expect(screen.queryByText("프로토타입 사진 사용")).not.toBeInTheDocument();
});
