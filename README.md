# Stratum Coverage Plugin

This is a plugin for Stratum Observability that allows you to send events to Coverage.


## Installation

```bash
npm install @kuzu-media/stratum-Coverage-js
```

## Usage

### Initialize the CoverageService
```typescript
import CoverageService, { CoveragePluginFactory } from "@kuzu-media/stratum-Coverage-js";
import { catalog, EVENT_ID } from "./catalog";

const Coverage_HOST = "https://your-Coverage-host.com";
const Coverage_KEY = "your-Coverage-key";
export const stratumService = new CoverageService({
  catalog: {
    items: catalog,
  },

  plugins: [
    CoveragePlugin({
      Coverage_HOST: Coverage_HOST,
      Coverage_KEY: Coverage_KEY,
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


stratumService.publish(EVENT_ID.LOADED, {
  pluginData: {
    CoveragePlugin: {
      properties: {
        loadedAt: new Date(),
      },
    }
  },
});

stratumService.publish(EVENT_ID.GENERIC_ERROR, {
  pluginData: {
    CoveragePlugin: {
      properties: {
        error: new Error(),
        message: "Something went wrong",
      },
    },
  },
});
```

### Catalog
```typescript
import { createCoverageCatalog , CoverageEventTypes} from "..";

export enum EVENT_ID {
  LOADED = "app-loaded",
  GENERIC_ERROR = "generic-error",
}

const events = {
  [EVENT_ID.LOADED]: {
    description: "This application has loaded for the first time",
    eventType: CoverageEventTypes.CAPTURE,
    properties: {
      // empty to help with type checking
      loadedAt: new Date(),
    },
  },

  [EVENT_ID.GENERIC_ERROR]: {
    description: "A generic error has occurred",
    eventType: CoverageEventTypes.ERROR,
    properties: {
      // empty to help with type checking
      error: new Error(),
      // empty to help with type checking
      message: "",
    },
  },
};

export const catalog = createCoverageCatalog<EVENT_ID, typeof events>(events);
```