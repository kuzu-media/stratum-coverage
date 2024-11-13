import { CoverageService, CoveragePlugin } from "..";
import { catalog } from "./catalog";


export const stratumService = new CoverageService({
  catalog: {
    items: catalog,
  },

  plugins: [
    CoveragePlugin({
      DEBUG: true,
    }),
  ],

  /**
  * The canonical name for referring to this capability
  */
  productName: "mission-sync",

  /**
  * Typically, this references the version of the application you're
  * publishing observability events from
  */
  productVersion: "0.1",
});


