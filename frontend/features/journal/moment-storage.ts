export const MOMENT_STORAGE_KEY = "pokefolio.prototype.moment";

export type MomentType = "opened-pack" | "brought-home" | "gifted-traded" | "special";

export type MockCard = {
  id: string;
  name: string;
  set: string;
  number: string;
  color: string;
};

export type Moment = {
  id: string;
  type: MomentType;
  createdAt: string;
  note: string;
  card: MockCard | null;
  hasPhoto: boolean;
};

export const mockCards: readonly MockCard[] = [
  { id: "violet-card", name: "보랏빛 저녁", set: "Pokefolio Memories", number: "018/100", color: "#dcd4f6" },
  { id: "forest-card", name: "초록빛 산책", set: "Pokefolio Memories", number: "032/100", color: "#d8eadc" },
  { id: "sunset-card", name: "노을의 온기", set: "Pokefolio Memories", number: "047/100", color: "#f4dfcc" },
];

export const momentTypeLabels: Record<MomentType, string> = {
  "opened-pack": "팩을 열었어요",
  "brought-home": "카드를 데려왔어요",
  "gifted-traded": "선물·교환이 있었어요",
  special: "특별한 순간이 있었어요",
};

function isMoment(value: unknown): value is Moment {
  if (!value || typeof value !== "object") return false;

  const moment = value as Record<string, unknown>;
  const card = moment.card as Record<string, unknown> | null;
  const hasValidCard = card === null || (
    typeof card === "object"
    && typeof card.id === "string"
    && typeof card.name === "string"
    && typeof card.set === "string"
    && typeof card.number === "string"
    && typeof card.color === "string"
  );

  return typeof moment.id === "string"
    && typeof moment.type === "string"
    && Object.hasOwn(momentTypeLabels, moment.type)
    && typeof moment.createdAt === "string"
    && !Number.isNaN(Date.parse(moment.createdAt))
    && typeof moment.note === "string"
    && typeof moment.hasPhoto === "boolean"
    && hasValidCard;
}

export function loadMoment(storage: Storage): Moment | null {
  try {
    const value: unknown = JSON.parse(storage.getItem(MOMENT_STORAGE_KEY) ?? "null");
    return isMoment(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveMoment(storage: Storage, moment: Moment) {
  storage.setItem(MOMENT_STORAGE_KEY, JSON.stringify(moment));
}

export function clearMoment(storage: Storage) {
  storage.removeItem(MOMENT_STORAGE_KEY);
}
