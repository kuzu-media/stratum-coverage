function isBrowser() {
    return typeof window !== "undefined" && typeof window.indexedDB !== "undefined";
}

// Function to read logs from file on the server (using fs)
const fs = isBrowser() ? null : require("fs");

export { isBrowser, fs };
