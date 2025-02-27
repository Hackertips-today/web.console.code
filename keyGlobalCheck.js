# Check for key globals

(async terms => {
    const results = [];

    const searchContent = (content, url) => {
        content.split('\n').forEach((line, index) => {
            if (terms.some(term => line.toLowerCase().includes(term.toLowerCase()))) {
                results.push(`Found in ${url} (Line ${index + 1}): ${line.trim()}`);
            }
        });
    };

    searchContent(document.documentElement.outerHTML, window.location.href);

    const fetchAndSearch = async url => {
        try {
            const response = await fetch(url);
            const text = await response.text();
            searchContent(text, url);
        } catch (e) {
            console.error(`Error fetching ${url}:`, e);
        }
    };

    const urls = [...document.querySelectorAll('link[rel="stylesheet"], script[src]')].map(el => el.href || el.src);
    await Promise.all(urls.map(fetchAndSearch));

    // Clickjacking test
    window.onload = () => {
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com"; // Modify if needed
        iframe.style.width = "800px";
        iframe.style.height = "600px";
        document.body.appendChild(iframe);

        setTimeout(() => {
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage("Testing clickjacking", "*");
            } else {
                console.log("Iframe blocked by X-Frame-Options or CSP.");
            }
        }, 2000);
    };

    // Display search results in an overlay
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '10px';
    iframe.style.left = '10px';
    iframe.style.width = '600px';
    iframe.style.height = '600px';
    iframe.style.zIndex = '10000';
    iframe.style.backgroundColor = 'white';
    iframe.style.border = '1px solid black';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();

    // Create a Trusted Types policy
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        const policy = trustedTypes.createPolicy("default", {
            createHTML: (input) => input
        });

        iframeDoc.write(policy.createHTML(`
            <html><body style="font-family: Arial, sans-serif;">
                <h1>Search Results</h1>
                <pre>${results.length ? results.join('\n\n') : `No occurrences of the terms "${terms.join(', ')}" found.`}</pre>
            </body></html>
        `));
    } else {
        // Fallback for browsers without Trusted Types enforcement
        iframeDoc.write(`
            <html><body style="font-family: Arial, sans-serif;">
                <h1>Search Results</h1>
                <pre>${results.length ? results.join('\n\n') : `No occurrences of the terms "${terms.join(', ')}" found.`}</pre>
            </body></html>
        `);
    }

    iframeDoc.close();

})([
    'secret', 'token', 'bearer', 'api', 'key', 'jwt', 'auth', 'authorization', 'client_id',
    'client_secret', 'access_token', 'refresh_token', 'google', 'firebase', 'maps.googleapis.com',
    'api_key', 'AIza', 'AIzaSy', 'AIzaS', 'AIzaT', 'AIzaU', 'AIzaV', 'AIzaW', 'AIzaX', 'AIzaY',
    'AIzaZ', 'AIza0', 'AIza1', 'AIza2', 'AIza3', 'AIza4', 'AIza5', 'AIza6', 'AIza7', 'AIza8',
    'AIza9', 'oauth', 'gapi', 'service_account', 'cloudfunction', 'firebaseio', 'realtime',
    'storage.googleapis.com', 'credentials', 'googleapis.com', 'v3', 'gcloud', 'gserviceaccount',
    'bigquery', 'cloudsql', 'identitytoolkit'
]).catch(console.error);

