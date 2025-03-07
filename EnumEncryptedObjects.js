// This script will attempt to enumerate encrypted objects within the DOM



(function findEncryptedGlobals() {
    const globalObjects = Object.keys(window); // Get all global properties

  // This first array is setting us up to ignore the common DOM globals
   const standardObjects = new Set([
        "window", "document", "console", "crypto", "fetch",
        "setTimeout", "setInterval", "clearTimeout", "clearInterval",
        "navigator", "location", "history", "screen", "frames",
        "self", "parent", "top", "opener",
        "performance", "btoa", "atob", "WebSocket", "indexedDB",
        "localStorage", "sessionStorage", "JSON", "Math", "Date",
        "Promise", "RegExp", "Intl", "WeakMap", "WeakSet",
        "Blob", "File", "FileReader", "XMLHttpRequest", "Event",
        "Map", "Set", "Symbol", "Array", "Object", "Function",
        "Boolean", "Number", "String", "Error", "TypeError",
        "eval", "parseInt", "parseFloat"
    ]); // Common built-in objects

    function isBase64(str) {
        return /^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0;
    }

    function isEncrypted(obj) {
        if (typeof obj === "string") {
            return obj.includes("google.crypto.tink") || isBase64(obj);
        }
        if (obj instanceof Uint8Array) {
            return obj.length > 16; // Common size for encrypted data
        }
        if (obj && typeof obj === "object") {
            return Object.keys(obj).some(key => 
                key.includes("key") && (isBase64(obj[key]) || obj[key] instanceof Uint8Array)
            );
        }
        return false;
    }

    const encryptedObjects = globalObjects.filter(objName => {
        if (standardObjects.has(objName)) return false;
        try {
            const objValue = window[objName];
            return isEncrypted(objValue);
        } catch (e) {
            return false; // Catch any access errors
        }
    });

    console.log("Potentially Encrypted Objects:", encryptedObjects);
})();

