// Latest version - works with TrustedTypes attempts at blocking script scraping


// Collect all script sources from the main document
const scriptSources = [...document.querySelectorAll('script[src]')].map(script => script.src);

// Check for iframe content and collect script sources from iframes
document.querySelectorAll('iframe').forEach(iframe => {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      const iframeScripts = [...iframeDoc.querySelectorAll('script[src]')].map(script => script.src);
      scriptSources.push(...iframeScripts);
    }
  } catch (e) {
    console.warn('Unable to access iframe due to CORS or other restrictions:', iframe, e);
  }
});

// Create wget commands
const cmds = scriptSources.map(src => `wget --user-agent "Trident" --connect-timeout 4 "${src}"`);

// Open a new window and dynamically populate it using DOM methods
const newWindow = window.open('', '_blank');
if (newWindow) {
  const doc = newWindow.document;

  // Create the basic HTML structure
  const html = doc.createElement('html');
  const head = doc.createElement('head');
  const title = doc.createElement('title');
  const body = doc.createElement('body');
  const pre = doc.createElement('pre');

  // Set the title
  title.textContent = 'Wget Commands';
  head.appendChild(title);

  // Add the wget commands to the <pre> element
  pre.textContent = cmds.join('\n');
  body.appendChild(pre);

  // Append head and body to the new document
  html.appendChild(head);
  html.appendChild(body);
  doc.replaceChild(html, doc.documentElement);
} else {
  console.error('Failed to open a new window. Make sure pop-ups are allowed.');
}

