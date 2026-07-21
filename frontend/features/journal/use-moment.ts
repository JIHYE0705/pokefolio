"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  clearMoment,
  loadMoment,
  MOMENT_STORAGE_KEY,
  saveMoment,
  type Moment,
} from "./moment-storage";

const changeEvent = "pokefolio:moment-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(MOMENT_STORAGE_KEY) ?? "";
}

export function useMoment() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const moment = useMemo(
    () => snapshot === null ? null : loadMoment(window.localStorage),
    [snapshot],
  );

  return {
    moment,
    ready: snapshot !== null,
    save(nextMoment: Moment) {
      saveMoment(window.localStorage, nextMoment);
      window.dispatchEvent(new Event(changeEvent));
    },
    reset() {
      clearMoment(window.localStorage);
      window.dispatchEvent(new Event(changeEvent));
    },
  };
}
