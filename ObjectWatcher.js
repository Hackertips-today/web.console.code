

   ▗▖ ▗▄▄▖    ▗▖ ▗▖ ▗▄▖ ▗▄▄▄▖ ▗▄▄▖▗▖ ▗▖▗▄▄▄▖▗▄▄▖ 
   ▐▌▐▌       ▐▌ ▐▌▐▌ ▐▌  █  ▐▌   ▐▌ ▐▌▐▌   ▐▌ ▐▌
   ▐▌ ▝▀▚▖    ▐▌ ▐▌▐▛▀▜▌  █  ▐▌   ▐▛▀▜▌▐▛▀▀▘▐▛▀▚▖
▗▄▄▞▘▗▄▄▞▘    ▐▙█▟▌▐▌ ▐▌  █  ▝▚▄▄▖▐▌ ▐▌▐▙▄▄▖▐▌ ▐▌
                                                 
                                          

  
(function() {
    // List of specific globals to track
    const specificGlobals = [
        'atDataLayer', 'google_tag_manager', 'google_tag_data', 'cookieAcceptance', 'cookiesAccepted',
        'onYouTubeIframeAPIReady', 'webVitals', 'gaGlobal', 'data', 'source', 'ports', '__gcse',
        'module$exports$cse$search', 'module$exports$cse$CustomImageSearch', 'module$exports$cse$CustomWebSearch',
        'google', 'module$exports$cse$searchcontrol', 'module$exports$cse$customsearchcontrol', '_googCsa',
        'angular', 'handlebars', 'underscore', 'moment', 'gapis', 'googletagmanager', 'WIZ',
        'googleapis', 'WIZ_global_data', 'WIZ_progress', 'gws_wizbind' // Added new objects
    ];

    // Function to get the list of globals that need to be watched from localStorage
    function getWatchedGlobals() {
        let storedGlobals = localStorage.getItem('watchedGlobals');
        if (storedGlobals) {
            return JSON.parse(storedGlobals);
        }
        return [];
    }

    // Function to store the list of watched globals to localStorage
    function setWatchedGlobals(globals) {
        localStorage.setItem('watchedGlobals', JSON.stringify(globals));
    }

    // Function to initialize and collect globals (check if already defined)
    function collectSpecificGlobals() {
        // Filter out globals that are not present in the window object (to avoid undefined)
        let filteredGlobals = specificGlobals.filter(key => key in window);
        console.log("Found Specific Globals (not yet tracking):", filteredGlobals);
        
        // Store the globals in localStorage for persistence across pages
        setWatchedGlobals(filteredGlobals);
    }

    // Function to start watching the globals
    function watchIt() {
        const globalsToWatch = getWatchedGlobals();

        globalsToWatch.forEach(key => {
            // We check if the object exists in the window and create a getter and setter
            if (key in window) {
                try {
                    let originalValue = window[key];

                    // Define getter and setter for the property to monitor access and modifications
                    Object.defineProperty(window, key, {
                        get() {
                            console.log(`[WATCHER] Accessed: ${key} =`, originalValue);
                            return originalValue;
                        },
                        set(newValue) {
                            console.log(`[WATCHER] Modified: ${key} =`, newValue);
                            originalValue = newValue;
                        },
                        configurable: true, // Allow configuration changes
                        enumerable: true // Ensure property shows up in enumerations
                    });
                } catch (error) {
                    // If defining a property fails, log the error and continue
                    console.error(`[WATCHER] Failed to set watcher for: ${key}. Error:`, error);
                }
            }
        });

        console.log('Watching started for:', globalsToWatch);
    }

    // Initialize and collect globals when the script is first loaded
    collectSpecificGlobals();

    // Expose the `watchIt` function to the console for manual activation
    window.watchIt = watchIt;
})();



