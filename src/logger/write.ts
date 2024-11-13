import { CoverageEvent } from "../types";
import { fs, isBrowser } from "./utils";
import IndexedDBHelper from "./indexdb";


// Function to handle event logging in the browser (using IndexedDB as storage)
async function logEventInIndexedDB(event: CoverageEvent) {

  new IndexedDBHelper().add({
    timestamp: new Date().toISOString(),
    event: event,
  });
}


function logEventInFile(event: CoverageEvent, logFileName = "eventLog.txt") {
  const timestampedEvent = `${new Date().toISOString()}: ${JSON.stringify(event)}\n`;

  return new Promise((resolve, reject) => {
    fs.appendFile(logFileName, timestampedEvent, (err:any) => {
      if (err) {
        console.error(`Failed to log event: ${err}`);
        reject("Error logging event in file");
      } else {
        resolve("Event logged in file");
      }
    });
  });
}

// Main function to handle logging based on environment
export async function logEvent(event: CoverageEvent, logFileName = "eventLog.txt") {
  if (isBrowser()) {
    return await logEventInIndexedDB(event);
  } else {
    return await logEventInFile(event, logFileName);
  }
}

