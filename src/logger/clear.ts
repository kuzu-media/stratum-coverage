import IndexedDBHelper from "./indexdb";
import { fs, isBrowser } from "./utils";

async function clearIndexedDB() {
  const dbHelper = new IndexedDBHelper();

  await dbHelper.clear();
}

function clearFile(filePath = "eventLog.txt") {
  fs.writeFile(filePath, "", (err:any) => {
    if (err) {
      console.error(`Failed to clear file: ${err}`);
    } else {
      console.log("File cleared successfully");
    }
  });
}

export async function clearStorage(filePath = "eventLog.txt") {
  if (isBrowser()) {
    return await clearIndexedDB();
  } else {
    clearFile(filePath);
  }
}
