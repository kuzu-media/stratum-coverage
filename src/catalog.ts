import { CoverageEvent } from "./types";
export function createCoverageCatalog<
  EventId extends string,
  T extends Record<EventId, Omit<CoverageEvent, "id">> & {
    [K in keyof T]: K extends EventId ? T[K] : never;
  },
>(events: T) {
  const catalog = {} as {
    [K in keyof T]: { id: K } & T[K];
  };

  (Object.keys(events) as (keyof T)[]).forEach((key) => {
    catalog[key] = {
      ...events[key],
      id: key as any,
    };
  });

  return catalog;
}
