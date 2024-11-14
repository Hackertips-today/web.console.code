let inspectedProperties = [];
let safeProperties = [];
let vulnerableProperties = [];

for (let key in window) {
    if (window.hasOwnProperty(key)) {
        inspectedProperties.push(key);
        let property = window[key];
        let isVulnerable = false;

        // Check if it's a function
        if (typeof property === "function") {
            let funcString = property.toString();

            // Check for eval usage
            if (/eval\(/.test(funcString)) {
                vulnerableProperties.push(`  ${key} - Warning: uses eval, which can lead to security issues.`);
                isVulnerable = true;
            }

            // Check for weak typing indicators
            if (/var\s+\w+\s*=|let\s+\w+\s*=|function\s*\w*\(\s*\w*\s*=/.test(funcString)) {
                vulnerableProperties.push(`  ${key} - Notice: might have weak typing or default parameters.`);
                isVulnerable = true;
            }

            if (!isVulnerable) {
                safeProperties.push(`${key} - No eval usage or weak typing detected`);
            }
        }

        // Check if it's an object
        else if (typeof property === "object" && property !== null) {
            // Check for direct prototype pollution
            if (property.__proto__ && property !== Object.prototype && property !== Array.prototype) {
                vulnerableProperties.push(`  ${key} - Warning: has a custom prototype, potential for prototype pollution.`);
                isVulnerable = true;
            }

            // Check for prototype pollution by key assignments
            for (let propKey in property) {
                if (property.hasOwnProperty(propKey)) {
                    if (propKey === "__proto__" || propKey === "constructor") {
                        vulnerableProperties.push(`  ${key}.${propKey} - Potential Prototype Pollution`);
                        isVulnerable = true;
                    }
                }
            }

            if (!isVulnerable) {
                safeProperties.push(`${key} - No prototype pollution detected`);
            }
        } else {
            safeProperties.push(`${key} - Not a function or object of interest`);
        }
    }
}

// Output Summary
console.log(`%cInspected Properties:\n`, "color: cyan; font-weight: bold");
console.log(inspectedProperties.join(", "));

console.log(`\n%cSafe/Non-Vulnerable Properties:\n`, "color: green; font-weight: bold");
safeProperties.forEach(property => console.log(`%c${property}`, "color: green"));

console.log(`\n%cVulnerable or Potentially Pollutable Properties:\n`, "color: red; font-weight: bold");
if (vulnerableProperties.length > 0) {
    vulnerableProperties.forEach(property => console.log(`%c${property}`, "color: red; font-weight: bold"));
} else {
    console.log("%cNo vulnerabilities or pollutable properties detected.", "color: lime; font-weight: bold");
}




