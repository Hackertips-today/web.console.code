
██    ██ ███████ ███████ ██████       █████   ██████  ███████ ███    ██ ████████     ███████ ███    ██ ██    ██ ███    ███ 
██    ██ ██      ██      ██   ██     ██   ██ ██       ██      ████   ██    ██        ██      ████   ██ ██    ██ ████  ████ 
██    ██ ███████ █████   ██████      ███████ ██   ███ █████   ██ ██  ██    ██        █████   ██ ██  ██ ██    ██ ██ ████ ██ 
██    ██      ██ ██      ██   ██     ██   ██ ██    ██ ██      ██  ██ ██    ██        ██      ██  ██ ██ ██    ██ ██  ██  ██ 
 ██████  ███████ ███████ ██   ██     ██   ██  ██████  ███████ ██   ████    ██        ███████ ██   ████  ██████  ██      ██ 
                                                                                                                                                          
                                                   [ UA Enum ]


const userAgents = [
  // Standard Browsers
  "Safari",
  "Coast",
  "Opera",
  "Edge",
  "Microsoft Edge",
  "Edg/",
  "OPR",
  "Firefox",
  "FxiOS",
  "Silk",
  "Android",
  "Chromium",
  "Chrome",
  "CriOS",
  "Trident",
  "MSIE",

  // Google-Specific
  "Googlebot",           // Google Search Crawler
  "Google Web Preview",  // Google Page Preview
  "Google Favicon",      // Google Favicon Fetcher
  "Google-InspectionTool", // Google URL Inspection Tool
  "GoogleDocs",          // Google Docs UA
  "GoogleAppsScript",    // Google Apps Scripts HTTP requests
  "GoogleImageProxy",    // Google Image Proxy
  "Feedfetcher-Google",  // Google Feed Reader

  // Azure-Specific
  "AzureAD",             // Microsoft Azure Active Directory bot
  "Bingbot",             // Microsoft Bing Search Bot
  "BingPreview",         // Bing Preview UA
  "MSOffice",            // Microsoft Office UA (Word, Excel, Outlook)
  "Windows Live Writer", // Microsoft Live Writer

  // AWS-Specific
  "Amazon CloudFront",   // AWS CloudFront requests
  "Amazonbot",           // Amazon Crawler
  "aws-sdk-js",          // AWS JavaScript SDK requests
  "aws-sdk-go",          // AWS SDK for Go
  "EC2MetadataClient",   // AWS EC2 Metadata service requests

  // Other Bots & Crawlers
  "DuckDuckBot",         // DuckDuckGo's web crawler
  "YandexBot",          // Yandex (Russian search engine) crawler
  "Baiduspider",        // Baidu Search Engine bot
  "MJ12bot",            // Majestic SEO crawler
  "CocCocbot",          // Vietnamese search engine bot
  "SeznamBot",          // Seznam.cz (Czech search engine) bot
  "AhrefsBot",          // Ahrefs SEO tool bot
  "SemrushBot",         // Semrush SEO crawler

  // Web Scrapers and Developer APIs
  "PostmanRuntime",      // Postman API Client
  "Python-requests",     // Python requests library
  "curl",               // Command-line HTTP client
  "Wget",               // Linux-based downloader
  "urllib",             // Python urllib requests
  "Java",               // Java HTTP client requests
  "Go-http-client",      // Golang HTTP client
  "Google-HTTP-Java-Client", // Google's Java HTTP client

  // Rare or Odd User-Agents
  "protobuf+json",       // Used in some API communications
  "protobuf+javascript", // Rare Google protobuf in JS
  "okhttp",             // Android HTTP client
  "Dalvik",             // Android Java-based runtime (seen in older devices)
  "Puffin",             // Puffin Browser (proxy-based mobile browser)
  "UC Browser",         // UC Browser (popular in India, China)
  "QQBrowser",          // Chinese mobile browser
  "Maxthon",            // Maxthon Browser (alternative browser)
  "Falkon",             // Open-source browser (rare)
  "Konqueror",          // Linux KDE-based browser
  "Links",              // Command-line text browser
  "Lynx",               // Another command-line text browser
  "Sogou",              // Chinese search engine bot
  "YaBrowser",          // Yandex Browser UA
  "NetFront",           // Old mobile browser (PSP, embedded devices)
  "NintendoBrowser",    // Nintendo 3DS browser
  "CFNetwork",          // Apple CoreFoundation network stack
  "Electron",           // Electron apps (used by Slack, VS Code, Discord)
  "QtWebEngine",        // Qt-based browser engine (rare but seen in some software)
];

console.log(userAgents);



-----
  
const userAgents = [
  "Googlebot", "Google Web Preview", "GoogleDocs", "GoogleAppsScript", "GoogleImageProxy",
  "Bingbot", "BingPreview", "Amazonbot", "CloudFront", "aws-sdk-js", "EC2MetadataClient",
  "Safari", "Chrome", "Edg/", "Edge", "Firefox", "FxiOS", "OPR", "CriOS", "Chromium",
  "Trident", "MSIE", "Silk", "Android", "Mozilla/5.0", "Electron"
];

// Corrected logic: Prioritize Chrome and Edge before Safari
const currentUA = navigator.userAgent;

// Prioritize Edge, Chrome, and Chromium over Safari
const detectedUA = userAgents.find(ua => 
  (ua === "Edg/" && currentUA.includes("Edg/")) ||
  (ua === "Chrome" && currentUA.includes("Chrome") && !currentUA.includes("Edg/")) ||
  (ua === "Chromium" && currentUA.includes("Chromium")) ||
  (ua === "Safari" && currentUA.includes("Safari") && !currentUA.includes("Chrome")) || 
  currentUA.includes(ua)
);

console.log(detectedUA ? `Detected User-Agent: ${detectedUA}` : "User-Agent not found");

