/*
Filename: AllUA.js
Purpose: Define an array of user agents which can be used for many things

Note: This Javascript snippet is meant for Developer Tools (F12) 
 / Inspect Element / Console tab
 Once in the Console Tab you will see messages, look at the bottom for >
To verify you are in the correct spot, you can list all the objects:
type in at the > prompt: 
 dir(window);
If you cannot type, you may have to type: 
> allow pasting 
(to be able to type at the console) - its not always mandatory.

Paste the script in the console at the > prompt
*/
    
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


/*
Example output:
VM261:48 Potentially Encrypted Objects: (33) ['sca', 'kta', 'lta', 'mta', 'nta', 'ota', 'pta', 'qta', 'rta', 'sta', 'tta', 'uta', 'vta', 'wta', 'xta', 'yta', 'zta', 'Ata', 'Bta', 'Cta', 'Dta', 'Eta', 'Fta', 'Gta', 'Hta', 'Ita', 'Jta', 'Kta', 'vIa', 'E9a', 'Cnb', 'Ewb', 'Fwb']0: "sca"1: "kta"2: "lta"3: "mta"4: "nta"5: "ota"6: "pta"7: "qta"8: "rta"9: "sta"10: "tta"11: "uta"12: "vta"13: "wta"14: "xta"15: "yta"16: "zta"17: "Ata"18: "Bta"19: "Cta"20: "Dta"21: "Eta"22: "Fta"23: "Gta"24: "Hta"25: "Ita"26: "Jta"27: "Kta"28: "vIa"29: "E9a"30: "Cnb"31: "Ewb"32: "Fwb"length: 33[[Prototype]]: Array(0)
12:58:09.688 undefined

Remember: undefined means a function (one of them) didnt return anything
*/
