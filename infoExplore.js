Paste into console on a target page for extracted links and other info:

(() => {
    const url = window.location.href;
    const path = ((url.match(/\/\/[^/]+(\/[^?]+)/) || [])[1] || url);
    const search = (url || '').split('?')[0];
    const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
    const forms = Array.from(document.querySelectorAll('form')).map(form => ({
        action: form.action,
        method: form.method,
        inputs: Array.from(form.elements).map(el => ({ name: el.name, type: el.type }))
    }));
    const scripts = Array.from(document.querySelectorAll('script')).map(script => script.src || script.innerText.substring(0, 100));
    const cookies = document.cookie;

    console.log(`URL Path: ${path}`);
    console.log(`URL without Query: ${search}`);
    console.log('Links:', links);
    console.log('Forms:', forms);
    console.log('Scripts:', scripts);
    console.log('Cookies:', cookies);

    fetch(url, {
        method: 'GET', // Simple GET request for demo purposes
    }).then(response => response.text())
      .then(text => console.log('Response:', text))
      .catch(err => console.error('Fetch error:', err));
})();

