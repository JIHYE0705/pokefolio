import { fireEvent, render, screen } from "@testing-library/react";
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
