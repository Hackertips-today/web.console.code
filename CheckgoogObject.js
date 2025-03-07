
/*
Filename: CheckgoogObject.js

 In this script, it is meant for Developer Tools (F12) or Inspect Element
 Console tab - paste the script in the console at the > prompt
 You may have to type: allow pasting (to be able to type at the console)
 start with typing:
 dir(window);
 This should list all globals/objects and you know you are in the right spot ;)

 This script is specific to Google - I have written a generic version which
 I will publish shortly, this script must have an object called 'goog' already
 defined in the DOM - to verify this type:
 console.log(goog);

 or just type goog<cr>
 If it does not have the Object (not all Google pages have this), it wont work.

 Here is the breakdown of how this script works:
 Purpose: Enumerate the 'goog' object and attempt to find properties of goog
 that may be subject to prototype pollution - it lists a nicely formatted output
 with the status.

 Here is the steps the script performs:
[*]  check object 'goog' for prototype poll / etc
[*]  Identify functions inside 'goog'
[*]  Enumerate all properties of 'goog'
[*]  Check for objects inside 'goog'
[*]  Attempt to log prototype chain (in case properties are hidden deeper)
[*]  Identify potentially writable properties for injection

*/

(function analyzeGoog() {
    if (typeof goog === 'undefined') {
        console.warn("[X] 'goog' object not found in this context.");
        return;
    }
    console.group("[?] Analyzing 'goog' Object Structure");
    const properties = Object.getOwnPropertyNames(goog);
    console.log("[^] Found properties in 'goog':", properties);
    const functions = properties.filter(prop => typeof goog[prop] === 'function');
    console.log("⚡ Functions found:", functions);
    const objects = properties.filter(prop => typeof goog[prop] === 'object' && goog[prop] !== null);
    console.log("[+] Nested Objects:", objects);
    const writableProps = properties.filter(prop => {
        let desc = Object.getOwnPropertyDescriptor(goog, prop);
        return desc && desc.writable && typeof goog[prop] === 'function';
    });
    console.log("⚠️ Writable Properties (Potential Injection Targets):", writableProps);

    // Look for 'IV' (Initialization Vectors, security-related properties)
    const ivMatches = properties.filter(prop => prop.toLowerCase().includes("iv"));
    console.log("[!] Potential IV-related properties:", ivMatches);

    // Detect prototype pollution possibilities
    console.group("[?] Checking for Prototype Pollution Vectors");
    try {
        if (!goog.__proto__.polluted) {
            goog.__proto__.polluted = "Injected!";
            console.warn("⚠️ Prototype Pollution Possible! `goog.__proto__.polluted` injected.");
        } else {
            console.warn("[*] Prototype Pollution Already Exists:", goog.__proto__.polluted);
        }
      } 
        catch (e) {
        console.error("[X] Prototype Pollution Injection Failed:", e.message);
                }
    console.groupEnd();
    console.group("[-] Prototype Chain of 'goog'");
    let proto = goog;
        while (proto) {
        console.log(proto);
        proto = Object.getPrototypeOf(proto);
                      }
    console.groupEnd()
    console.groupEnd();
})();

