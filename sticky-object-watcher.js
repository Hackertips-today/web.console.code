Paste this into console, after identifying custom set variables (type a letter in console, notice the different objects)
Change the object name that you want to watch - right now in the example it is set to "google_tag_data".

How this works: 
* Uses Object.defineProperty() to intercept reads/writes to targetVariable.
* Stores changes persistently in localStorage, ensuring it survives page reloads.
* Logs all changes for debugging.
  
  
  (function() {
    let value;
    Object.defineProperty(window, "google_tag_data", {
        get() { return value; },
        set(newValue) {
            console.log("[Watcher] Variable Changed: ", newValue);
            value = newValue;
            localStorage.setItem("watchedVar", JSON.stringify(newValue)); // Persist value
        }
    });

    // Restore previous value after page load
    if (localStorage.getItem("watchedVar")) {
        window.targetVariable = JSON.parse(localStorage.getItem("watchedVar"));
    }
})();


