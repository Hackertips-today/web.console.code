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

Order of operations of this script:
// Get the current user agent string
// Find a match in the list:  Edge > Chrome > Chromium > Safari
// Log the detected user agent

/*
const userAgents = [
  "Googlebot", "Google Web Preview", "GoogleDocs", "GoogleAppsScript", "GoogleImageProxy",
  "Bingbot", "BingPreview", "Amazonbot", "CloudFront", "aws-sdk-js", "EC2MetadataClient",
  "Safari", "Chrome", "Edg/", "Edge", "Firefox", "FxiOS", "OPR", "CriOS", "Chromium",
  "Trident", "MSIE", "Silk", "Android", "Mozilla/5.0", "Electron"
];

const currentUA = navigator.userAgent;
const detectedUA = userAgents.find(ua => 
  (ua === "Edg/" && currentUA.includes("Edg/")) ||  // Detect Edge first
  (ua === "Chrome" && currentUA.includes("Chrome") && !currentUA.includes("Edg/")) || // Prioritize Chrome over Safari
  (ua === "Chromium" && currentUA.includes("Chromium")) ||
  (ua === "Safari" && currentUA.includes("Safari") && !currentUA.includes("Chrome")) || // Ensure Safari is not falsely detected when Chrome is present
  currentUA.includes(ua) // Default match
);

console.log(detectedUA ? `Detected User-Agent: ${detectedUA}` : "User-Agent not found");
