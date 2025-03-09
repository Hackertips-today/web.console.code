(function () {
    console.clear();
    console.log("%cExtracting Google Search Results...", "color: cyan; font-weight: bold; font-size: 14px;");

    const results = [];
    document.querySelectorAll("div.tF2Cxc").forEach((el, index) => {
        const title = el.querySelector("h3") ? el.querySelector("h3").innerText : "No Title";
        const link = el.querySelector("a") ? el.querySelector("a").href : "No URL";
        const snippet = el.querySelector(".VwiC3b") ? el.querySelector(".VwiC3b").innerText : "No Snippet";

        results.push({ Index: index + 1, Title: title, URL: link, Snippet: snippet });
    });

    if (results.length > 0) {
        console.table(results);
    } else {
        console.log("%cNo search results found!", "color: red; font-weight: bold;");
    }
})();
