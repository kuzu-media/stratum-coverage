import { CoverageEvent } from "../types";

export interface LogEntry {
    id?: number;
    timestamp: string;
    event: CoverageEvent;
}

class IndexedDBHelper {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null = null;

    constructor(dbName = "logDatabase", storeName = "logs") {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    // Open the database and store a reference to it
    private async openDatabase(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
                }
            };

            request.onsuccess = (event: Event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve(this.db);
            };

            request.onerror = () => reject("Error opening IndexedDB");
        });
    }

    // Helper to perform a transaction on the object store
    private async transaction(mode: IDBTransactionMode = "readwrite"): Promise<IDBObjectStore> {
        const db = await this.openDatabase();
        return db.transaction(this.storeName, mode).objectStore(this.storeName);
    }

    // Add data to the store
    async add(data: LogEntry): Promise<string> {
        const store = await this.transaction("readwrite");
        return new Promise((resolve, reject) => {
            const request = store.add(data);
            request.onsuccess = () => resolve("Data added to IndexedDB");
            request.onerror = () => reject("Error adding data to IndexedDB");
        });
    }

    // Read all data from the store
    async readAll(): Promise<LogEntry[]> {
        const store = await this.transaction("readonly");
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = (event) => resolve((event.target as IDBRequest<LogEntry[]>).result);
            request.onerror = () => reject("Error reading data from IndexedDB");
        });
    }

    // Clear all data from the store
    async clear(): Promise<string> {
        const store = await this.transaction("readwrite");
        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve("IndexedDB cleared");
            request.onerror = () => reject("Error clearing IndexedDB");
        });
    }
}

export default IndexedDBHelper;