import { CoverageEvent } from "src/types";
import IndexedDBHelper, { LogEntry } from "./indexdb";
import { fs, isBrowser } from "./utils";


// Function to read logs from IndexedDB in the browser
async function readLogsFromIndexedDB() {
  const dbHelper = new IndexedDBHelper();

  const logs = await dbHelper.readAll();

   const parsedLogs = logs.map((log: LogEntry) => {

    return {
      timestamp: log.timestamp,
      event: log.event
    };
  })
  .filter(Boolean);

  return parsedLogs;
}



function readLogsFromFile(filePath = "eventLog.txt") {
  try {
    const rawLogs = fs.readFileSync(filePath, "utf-8");
    const lines: string[] = rawLogs
    .split("\n")
    .filter((line: string) => line); // Remove any empty lines
    const parsedLogs = lines.map(line => {
      const [timestamp, jsonString] = line.split(': ', 2); // split by ': ' to get timestamp and JSON

      if (!jsonString) return null;
      const eventData = JSON.parse(jsonString) as CoverageEvent

      return {
        timestamp,
        event: eventData
      };
    })
    .filter(Boolean) as LogEntry[];

    return parsedLogs;

  } catch (error) {
    console.error(`Failed to read log file: ${error}`);
    return [];
  }
}

// Main function to read logs based on environment
export async function readLogs(filePath = "eventLog.txt"): Promise<LogEntry[]> {
  let lines: LogEntry[] = [];
  if (isBrowser()) {
    lines = await readLogsFromIndexedDB();
  } else {
    lines = readLogsFromFile(filePath);
  }

  return lines;
}

