// Make sure you change the first lines value to an object/variable you are interested in!

const SearchVal = "google_tag_manager"; // Change this to any global object name

(function analyzeObject() {
    if (typeof window[SearchVal] === 'undefined') {
        console.warn(`[*] '${SearchVal}' object not found in this context.`);
        return;
    }

    console.group(`[-] Analyzing '${SearchVal}' Object Structure`);

    // Reference the target object
    const targetObject = window[SearchVal];

    // Enumerate all properties
    const properties = Object.getOwnPropertyNames(targetObject);
    console.log(`📌 Found properties in '${SearchVal}':`, properties);

    // Identify functions inside the object
    const functions = properties.filter(prop => typeof targetObject[prop] === 'function');
    console.log("⚡ Functions found:", functions);

    // Check for objects inside the target object
    const objects = properties.filter(prop => typeof targetObject[prop] === 'object' && targetObject[prop] !== null);
    console.log("[+] Nested Objects:", objects);

    // Identify writable properties (potential for injection)
    const writableProps = properties.filter(prop => {
        let desc = Object.getOwnPropertyDescriptor(targetObject, prop);
        return desc && desc.writable && typeof targetObject[prop] === 'function';
    });
    console.log("[-] Writable Properties (Potential Injection Targets):", writableProps);

    // Look for 'IV' (Initialization Vectors, security-related properties)
    const ivMatches = properties.filter(prop => prop.toLowerCase().includes("iv"));
    console.log("[!] Potential IV-related properties:", ivMatches);

    // Detect prototype pollution possibilities
    console.group("[-] Checking for Prototype Pollution Vectors");
    try {
        if (!targetObject.__proto__.polluted) {
            targetObject.__proto__.polluted = "Injected!";
            console.warn(`⚠️ Prototype Pollution Possible! '${SearchVal}.__proto__.polluted' injected.`);
        } else {
            console.warn(`[*] Prototype Pollution Already Exists:`, targetObject.__proto__.polluted);
        }
    } catch (e) {
        console.error("[X] Prototype Pollution Injection Failed:", e.message);
    }
    console.groupEnd();

    // Attempt to log prototype chain (in case properties are hidden deeper)
    console.group(`[-] Prototype Chain of '${SearchVal}'`);
    let proto = targetObject;
    while (proto) {
        console.log(proto);
        proto = Object.getPrototypeOf(proto);
    }
    console.groupEnd();

    console.groupEnd();
})();
