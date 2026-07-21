import { describe, expect, it } from "vitest";

import {
  clearMoment,
  loadMoment,
  MOMENT_STORAGE_KEY,
  saveMoment,
  type Moment,
} from "@/features/journal/moment-storage";

const moment: Moment = {
  id: "moment-1",
  type: "brought-home",
  createdAt: "2026-07-21T12:00:00.000Z",
  note: "오래 기다린 카드를 데려온 날",
  card: {
    id: "violet-card",
    name: "보랏빛 저녁",
    set: "Pokefolio Memories",
    number: "018/100",
    color: "#dcd4f6",
  },
  hasPhoto: true,
};

function createStorage(): Storage {
  const values = new Map<string, string>();

  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
}

describe("moment storage", () => {
  it("stores and restores the same Moment", () => {
    const storage = createStorage();
    saveMoment(storage, moment);

    expect(loadMoment(storage)).toEqual(moment);
  });

  it("returns empty for invalid saved data", () => {
    const storage = createStorage();
    storage.setItem(MOMENT_STORAGE_KEY, "not-json");

    expect(loadMoment(storage)).toBeNull();
  });

  it("clears only the prototype Moment", () => {
    const storage = createStorage();
    storage.setItem("keep-me", "yes");
    saveMoment(storage, moment);

    clearMoment(storage);

    expect(loadMoment(storage)).toBeNull();
    expect(storage.getItem("keep-me")).toBe("yes");
  });
});
