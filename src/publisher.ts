import { BasePublisher } from "@capitalone/stratum-observability";

import { BaseCoverageEventModel } from "./model";
import {
  CoverageEvent,
  CoveragePluginOptions,
  CoverageSnapshot,
} from "./types";
import { logEvent } from "./logger/write";
import { fs, isBrowser } from "./logger/utils";

export class CoveragePublisher extends BasePublisher<CoverageEvent<string>> {
  // Required
  name = "CoveragePublisher";
  debug?: boolean;
  constructor(options: CoveragePluginOptions) {
    super();


    this.debug = options.DEBUG || false;
  }

  /**
   * Required
   * Check if your publisher source is available (aka scripts installed, environment
   * is set up, etc.)
   *
   * In this case, we make sure that console.log() is accessible.
   */
  async isAvailable(_model: BaseCoverageEventModel) {

    const available = isBrowser() ? window.indexedDB !== undefined : fs !== null;
    return available;
  }

  /**
   * Required
   * Map the contents of your event model instance to your event schema
   */
  getEventOutput(
    model: BaseCoverageEventModel,
    options?: CoverageSnapshot,
  ): CoverageEvent<string> {
    const data = model.getData(options);
    return data;
  }

  /**
   * Required
   * Send your simple event content to the external publisher
   *
   * In this, case we publish the event to the console log
   */
  async publish(event: CoverageEvent<string>) {

    if (this.debug) {
      console.log('event', event);
    }
    await logEvent(event)
  }
}
