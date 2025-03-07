// check object 'goog' for prototype poll / etc
(function analyzeGoog() {
    if (typeof goog === 'undefined') {
        console.warn("❌ 'goog' object not found in this context.");
        return;
    }

    console.group("🔍 Analyzing 'goog' Object Structure");

    // Enumerate all properties of 'goog'
    const properties = Object.getOwnPropertyNames(goog);
    console.log("📌 Found properties in 'goog':", properties);

    // Identify functions inside 'goog'
    const functions = properties.filter(prop => typeof goog[prop] === 'function');
    console.log("⚡ Functions found:", functions);

    // Check for objects inside 'goog'
    const objects = properties.filter(prop => typeof goog[prop] === 'object' && goog[prop] !== null);
    console.log("📂 Nested Objects:", objects);

    // Identify writable properties (potential for injection)
    const writableProps = properties.filter(prop => {
        let desc = Object.getOwnPropertyDescriptor(goog, prop);
        return desc && desc.writable && typeof goog[prop] === 'function';
    });
    console.log("⚠️ Writable Properties (Potential Injection Targets):", writableProps);

    // Look for 'IV' (Initialization Vectors, security-related properties)
    const ivMatches = properties.filter(prop => prop.toLowerCase().includes("iv"));
    console.log("🔑 Potential IV-related properties:", ivMatches);

    // Detect prototype pollution possibilities
    console.group("🛠 Checking for Prototype Pollution Vectors");
    try {
        if (!goog.__proto__.polluted) {
            goog.__proto__.polluted = "Injected!";
            console.warn("⚠️ Prototype Pollution Possible! `goog.__proto__.polluted` injected.");
        } else {
            console.warn("✅ Prototype Pollution Already Exists:", goog.__proto__.polluted);
        }
    } catch (e) {
        console.error("❌ Prototype Pollution Injection Failed:", e.message);
    }
    console.groupEnd();

    // Attempt to log prototype chain (in case properties are hidden deeper)
    console.group("🔗 Prototype Chain of 'goog'");
    let proto = goog;
    while (proto) {
        console.log(proto);
        proto = Object.getPrototypeOf(proto);
    }
    console.groupEnd();

    console.groupEnd();
})();

