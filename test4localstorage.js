
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦✧✦━[ test4localstorage.js ] ━━━━━✦✧✦━━━━━━━━━━━━━━━━━━━━━━   
      _            _     ___ _                 _     _                             
     | |          | |   /   | |               | |   | |                            
     | |_ ___  ___| |_ / /| | | ___   ___ __ _| |___| |_ ___  _ __ __ _  __ _  ___ 
     | __/ _ \/ __| __/ /_| | |/ _ \ / __/ _` | / __| __/ _ \| '__/ _` |/ _` |/ _ \
     | ||  __/\__ \ |_\___  | | (_) | (_| (_| | \__ \ || (_) | | | (_| | (_| |  __/
      \__\___||___/\__|   |_/_|\___/ \___\__,_|_|___/\__\___/|_|  \__,_|\__, |\___|
                                                                         __/ |     
                                                                       |___/      
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦✧✦━[ test4localstorage.js ] ━━━━━✦✧✦━━━━━━━━━━━━━━━━━━━━━━
      // Note: Load target webpage, on DOM ready, inspect element, 
      // console paste in the following Javascript snippet:
  
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&    
      storage.length !== 0  );}}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦✧✦━━[ Invoke Function ] ━━━━✦✧✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // Note: The function created will not do anything until invoked:
    
if (storageAvailable("localStorage")) {
  console.log('localStorage available and found');
} else {
console.log('localStorage: not avail / locked');}

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦✧✦━━[ Output Example ] ━━━━✦✧✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Example output:

VM557:2 localStorage available and found  [ Indication of success ] 

// Note: This indicates the current page is allowihg access to localStorage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦✧✦━━[ E O F ] ━━━━✦✧✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


