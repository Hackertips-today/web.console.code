
OBJECT                                  EXPLORE
 _____  ____   ____  ____  ___  ____    ____  _  _  ____  __    _____  ____  ____ 
(  _  )(  _ \ (_  _)( ___)/ __)(_  _)  ( ___)( \/ )(  _ \(  )  (  _  )(  _ \( ___)
 )(_)(  ) _ <.-_)(   )__)( (__   )(     )__)  )  (  )___/ )(__  )(_)(  )   / )__) 
(_____)(____/\____) (____)\___) (__)   (____)(_/\_)(__)  (____)(_____)(_)\_)(____)
-------------------------------------/--------------------------------------------
DATE: 10/22/2024
DESC: Paste into console and search the keywords at the end (in the array)
      Very useful to find pollutable objects


(async terms => { 
  const results = [], pollutableResults = [], 
        searchContent = (content, url) => { 
          content.split('\n').forEach((line, index) => { 
            if (terms.some(term => line.toLowerCase().includes(term.toLowerCase()))) { 
              const result = { 
                url, 
                lineNumber: index + 1, 
                line: line.trim(), 
                pollutable: !url.startsWith(window.location.origin) // Flag if the URL is external
              }; 
              results.push(result); 
              if (result.pollutable) {
                pollutableResults.push(result);  // Track pollutable results separately
              }
            } 
          }); 
        }; 

  // Search the HTML content of the current page
  searchContent(document.documentElement.outerHTML, window.location.href); 

  const fetchAndSearch = async url => { 
    try { 
      const response = await fetch(url), 
            text = await response.text(); 
      searchContent(text, url); 
    } catch (e) { 
      console.error(`Error fetching ${url}:`, e); 
    } 
  }; 

  // Fetch stylesheets and scripts, and check their content
  const urls = [...document.querySelectorAll('link[rel="stylesheet"], script[src]')].map(el => el.href || el.src); 

  await Promise.all(urls.map(fetchAndSearch)); 

  // Output results, marking external content as "pollutable"
  if (results.length) {
    results.forEach(result => console.log(
      `Found in ${result.url} (Line ${result.lineNumber}): ${result.line} ${result.pollutable ? "[POTENTIALLY POLLUTABLE]" : "[SAFE]"}`
    ));

    // Re-list pollutable entries at the bottom
    if (pollutableResults.length) {
      console.log('\n--- Pollutable Results ---');
      pollutableResults.forEach(result => console.log(
        `Found in ${result.url} (Line ${result.lineNumber}): ${result.line} [POTENTIALLY POLLUTABLE]`
      ));
    }
  } else {
    console.log(`No occurrences of the terms "${terms.join(', ')}" found.`);
  }
})(['secret', 'token', 'bearer', 'api', 'key', 'jwt']).catch(console.error);



