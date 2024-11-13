import { createCoverageCatalog , CoverageEventTypes} from "..";

export enum EVENT_ID {
  LOADED = "app-loaded",
  GENERIC_ERROR = "generic-error",
  BUTTON_CLICKED = "button-clicked",
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
  [EVENT_ID.BUTTON_CLICKED]: {
    description: "A button has been clicked",
    eventType: CoverageEventTypes.CAPTURE,
  },
};

export const catalog = createCoverageCatalog<EVENT_ID, typeof events>(events);

