import {
  StratumService,
  StratumServiceOptions,
  UserDefinedEventOptions,
} from "@capitalone/stratum-observability";

import { GenericCoverageCatalog, Properties } from "./types";

class CoverageService<
  CoverageEventId extends string,
  CoverageCatalog extends GenericCoverageCatalog<CoverageEventId>,
> extends StratumService {
  constructor(
    options: Omit<StratumServiceOptions, "catalog"> & {
      catalog: Omit<StratumServiceOptions["catalog"], "items"> & {
        items: CoverageCatalog;
      };
    },
  ) {
    super(options);
  }

  publish<
    T extends CoverageEventId,
    Props extends Properties<T, CoverageCatalog>,
  >(
    key: T,
    options: Partial<UserDefinedEventOptions> & {
      pluginData: {
        CoveragePlugin: {
          properties: Props;
        };
      };
    },
  ): Promise<boolean>;

  publish<T extends CoverageEventId, Props extends undefined>(
    key: T,
    options?: undefined, // Optional when Props is undefined
  ): Promise<boolean>;
  publish<
    T extends CoverageEventId,
    Props extends Properties<T, CoverageCatalog> | undefined,
  >(
    key: T,
    options: Props extends undefined
      ? undefined
      : Partial<UserDefinedEventOptions> & {
          pluginData: {
            CoveragePlugin: {
              properties: Props;
            };
          };
        },
  ): Promise<boolean> {
    return super.publish(key, options);
  }
}

export default CoverageService;
