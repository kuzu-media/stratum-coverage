import {
  EventOptions,
  StratumSnapshot,
} from "@capitalone/stratum-observability";
import { CatalogEvent } from "@capitalone/stratum-observability";
export enum CoverageEventTypes {
  CAPTURE = "capture",
  ERROR = "error",
}

export interface CoveragePluginOptions {
  DEBUG?: boolean;
}

export type Properties<
  CoverageEventId extends string,
  CoverageCatalog extends Record<CoverageEventId, { properties?: any | undefined }>,
> = CoverageCatalog[CoverageEventId]["properties"];

interface CoverageEventOptions extends Partial<EventOptions> {
  data?: {
    properties: { [key: string]: any };
  };
}
export interface CoverageSnapshot extends StratumSnapshot {
  eventOptions?: CoverageEventOptions;
}

export interface CoverageEvent<EventId extends string = string>
  extends CatalogEvent<CoverageEventTypes> {
  id: EventId;
  description: string;
  properties?: { [key: string]: any }; // will be overridden by the catalog
}

export type CoverageEventCatalog<
  EventId extends string,
  Catalog extends { [K in EventId]: CoverageEvent<K> },
> = {
  [K in keyof Catalog]: Catalog[K];
};

export type GenericCoverageCatalog<EventId extends string> = {
  [K in EventId]: CoverageEvent<K>;
};
