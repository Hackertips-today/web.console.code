window._details = [
    'iframe', 'frame', 'object', 'embed', 'applet', 'form', 'meta', 'script',
    'link', 'style', 'video', 'audio', 'canvas', 'svg', 'source', 'picture',
    'noscript', 'base', 'img', 'track', 'param', 'map', 'area', 'marquee',
    'body', 'head', 'div', 'span', 'section', 'article', 'aside', 'header',
    'footer', 'nav', 'main', 'details', 'summary', 'template', 'shadow',
    'slot', 'data', 'time', 'meter', 'progress', 'output', 'wbr', 'dialog',
    'button', 'input', 'textarea', 'select', 'option', 'optgroup', 'datalist'
].map(type => 
    Array.from(document.querySelectorAll(type)).map((el, index) => 
        `Type: ${type}, Src: ${el.src || 'No src'}, ID: ${el.id || 'No ID, index ' + index}, 
        Class: ${el.className || 'No class'}, HTML: ${el.outerHTML.slice(0, 200)}`
    )
).flat();

if (window._details.length) {
    console.log("Detected framing elements and potential security risks:");
    window._details.forEach(detail => console.log(detail));
} else {
    console.log("No common framing or embedded elements detected.");
}



