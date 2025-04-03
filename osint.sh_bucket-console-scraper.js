
(async function scrapeStoreCopy() {
  const urls = Array.from(document.querySelectorAll('td[data-th="Bucket URL"] a')).map(a => ({
    url: a.href,
    text: a.textContent.trim()
  }));

  const storageResults = {
    cookie: false,
    localStorage: false,
    sessionStorage: false,
    indexedDB: false
  };

  try {
    document.cookie = "xssTestCookie=1";
    storageResults.cookie = document.cookie.includes("xssTestCookie=1");
  } catch {}

  try {
    localStorage.setItem("xssTestLocal", "1");
    storageResults.localStorage = localStorage.getItem("xssTestLocal") === "1";
    localStorage.setItem("scrapedBucketURLs", JSON.stringify(urls));
  } catch {}

  try {
    sessionStorage.setItem("xssTestSession", "1");
    storageResults.sessionStorage = sessionStorage.getItem("xssTestSession") === "1";
  } catch {}

  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open("ScrapeStorageTest", 1);
      request.onsuccess = () => {
        storageResults.indexedDB = true;
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
      request.onupgradeneeded = event => {
        event.target.result.createObjectStore("urls", { keyPath: "url" });
      };
    });
    const tx = db.transaction("urls", "readwrite");
    const store = tx.objectStore("urls");
    urls.forEach(u => store.put(u));
    tx.oncomplete = () => db.close();
  } catch {}

  const urlList = urls.map(u => u.url).join('\n');

  // Try modern clipboard API first
  try {
    await navigator.clipboard.writeText(urlList);
    console.log("Copied all URLs to clipboard (navigator.clipboard)!");
  } catch (err) {
    // Fallback to execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = urlList;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("📋 Copied all URLs to clipboard (execCommand fallback)!");
    } catch (e) {
      console.warn("Clipboard copy failed:", e);
    }
  }

  console.table(urls);
  console.log("Storage Write Test Results:", storageResults);
})();
