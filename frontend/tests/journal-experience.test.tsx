import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

import HomePage from "@/app/(app)/page";
import MomentDetailPage from "@/app/(app)/journal/[id]/page";
import CreateMomentPage from "@/app/(app)/journal/new/page";
import JournalPage from "@/app/(app)/journal/page";
import RewardPage from "@/app/(app)/journal/reward/page";
import { loadMoment, saveMoment, type Moment } from "@/features/journal/moment-storage";

const navigation = vi.hoisted(() => ({ push: vi.fn(), routeId: "moment-1" }));

const moment: Moment = {
  id: "moment-1",
  type: "special",
  createdAt: "2026-07-21T12:00:00.000Z",
  note: "",
  card: null,
  hasPhoto: false,
};

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: navigation.routeId }),
  useRouter: () => ({ push: navigation.push }),
}));

beforeEach(() => {
  window.localStorage.clear();
  saveMoment(window.localStorage, moment);
  navigation.routeId = moment.id;
});

it.each([
  ["저장 보상", RewardPage],
  ["타임라인", JournalPage],
  ["Moment 상세", MomentDetailPage],
  ["Home", HomePage],
])("does not invent a note on %s", (_, Page) => {
  render(<Page />);

  expect(screen.queryByText("오늘의 마음을 조용히 남겼어요.")).not.toBeInTheDocument();
  expect(screen.getByText("특별한 순간이 있었어요")).toBeInTheDocument();
});

it("shows the first saved Moment across reward, timeline, detail, and Home", () => {
  window.localStorage.clear();
  const create = render(<CreateMomentPage />);

  fireEvent.click(screen.getByRole("button", { name: /카드를 데려왔어요/ }));
  fireEvent.click(screen.getByRole("button", { name: /노을의 온기/ }));
  fireEvent.change(screen.getByLabelText(/한 줄 남기기/), {
    target: { value: "처음 남긴 소중한 순간" },
  });
  fireEvent.click(screen.getByRole("button", { name: "기억 남기기" }));
  create.unmount();
  navigation.routeId = loadMoment(window.localStorage)?.id ?? "";

  for (const Page of [RewardPage, JournalPage, MomentDetailPage, HomePage]) {
    const view = render(<Page />);
    expect(screen.getByText("처음 남긴 소중한 순간")).toBeInTheDocument();
    expect(screen.getAllByText("노을의 온기").length).toBeGreaterThan(0);
    view.unmount();
  }
});

it("returns to Journal Empty after resetting demo data", () => {
  render(<JournalPage />);

  fireEvent.click(screen.getByRole("button", { name: "데모 데이터 초기화" }));

  expect(screen.getByRole("heading", { name: /첫 번째 추억을/ })).toBeInTheDocument();
  expect(window.localStorage.length).toBe(0);
});
