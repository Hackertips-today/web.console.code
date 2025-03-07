// Paste into inspect/console look for interesting objects

(function() {
    // Get all properties in window
    let allProps = Object.getOwnPropertyNames(window);
    
    // Standard DOM and JavaScript objects (common in all browsers)
    let standardObjects = new Set([
        "window", "document", "navigator", "location", "history",
        "screen", "frames", "parent", "top", "self", "opener",
        "crypto", "performance", "localStorage", "sessionStorage",
        "fetch", "XMLHttpRequest", "setTimeout", "setInterval",
        "clearTimeout", "clearInterval", "console", "alert", "prompt",
        "confirm", "btoa", "atob", "open", "close", "blur", "focus",
        "scroll", "resizeTo", "resizeBy", "moveTo", "moveBy",
        "addEventListener", "removeEventListener", "dispatchEvent",
        "setImmediate", "clearImmediate", "Event", "CustomEvent",
        "MutationObserver", "IntersectionObserver",
        "requestAnimationFrame", "cancelAnimationFrame",
        "Audio", "Image", "HTMLElement", "HTMLDocument", "Node",
        "Element", "Text", "Comment", "DOMParser",
        "FormData", "Blob", "File", "FileReader",
        "MouseEvent", "KeyboardEvent", "TouchEvent",
        "Promise", "Symbol", "Reflect", "Proxy",
        "Function", "Boolean", "Number", "String", "Date",
        "RegExp", "Error", "TypeError", "SyntaxError", "RangeError",
        "EvalError", "ReferenceError", "Array", "ArrayBuffer",
        "Uint8Array", "Uint16Array", "Uint32Array",
        "Int8Array", "Int16Array", "Int32Array", "Float32Array",
        "Float64Array", "BigInt", "BigInt64Array", "BigUint64Array",
        "Math", "JSON", "Intl", "decodeURI", "decodeURIComponent",
        "encodeURI", "encodeURIComponent", "escape", "unescape",
        "isFinite", "isNaN", "parseFloat", "parseInt", "Infinity",
        "NaN", "undefined", "arguments", "eval", "parseInt",
        "parseFloat", "isFinite", "isNaN", "decodeURI",
        "decodeURIComponent", "encodeURI", "encodeURIComponent"
    ]);

    // Find non-standard objects
    let nonStandard = allProps.filter(prop => !standardObjects.has(prop));

    // Output results
    console.log("=== Non-Standard / Custom DOM Objects ===");
    console.table(nonStandard);
})();
