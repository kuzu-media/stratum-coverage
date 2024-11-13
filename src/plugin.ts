import { BasePlugin } from "@capitalone/stratum-observability";

import { CoverageCaptureEventModel, CoverageErrorEventModel } from "./model";
import { CoveragePublisher } from "./publisher";
import { CoverageEventTypes, CoveragePluginOptions } from "./types";
import { clearStorage } from "./logger/clear";

/**
 * For TypeScript support, BasePlugin accepts types for
 */
export class CoveragePlugin extends BasePlugin<never, CoveragePluginOptions> {
  name = "CoveragePlugin";

  constructor(options: CoveragePluginOptions) {
    super();
    this.publishers = [new CoveragePublisher(options)];
    this.eventTypes = {
      [CoverageEventTypes.CAPTURE]: CoverageCaptureEventModel,
      [CoverageEventTypes.ERROR]: CoverageErrorEventModel,
    };
  }
}

const CoveragePluginFactory = (options?: CoveragePluginOptions) => {
  if (!options) {
    throw new Error("CoveragePluginOptions are required");
  }

  clearStorage();

  return new CoveragePlugin(options);
};

export { CoveragePluginFactory };
