Storage Watcher JS - paste into console:

This script will watch local, session and cookie stores for any access from the current page as well as if any changes are made


["localStorage", "sessionStorage"].forEach(storageType => {
    const storage = window[storageType];
    const originalSetItem = storage.setItem, originalRemoveItem = storage.removeItem;
    storage.setItem = function (key, value) {
        console.log(`[${storageType}] SET: ${key} = ${value} | Caller:`, new Error().stack);
        originalSetItem.apply(this, arguments);
    };
    storage.removeItem = function (key) {
        console.log(`[${storageType}] REMOVE: ${key} | Caller:`, new Error().stack);
        originalRemoveItem.apply(this, arguments);
    };
    window.addEventListener("storage", e => console.log(`[STORAGE EVENT] type: ${storageType}, key: ${e.key}, newValue: ${e.newValue}, oldValue: ${e.oldValue}, URL: ${e.url}, Caller:`, new Error().stack));
});

document.__defineSetter__('cookie', function(value) {
    console.log(`[COOKIES] SET: ${value} | Caller:`, new Error().stack);
    document.__proto__.__lookupSetter__('cookie').call(this, value);
});
document.__defineGetter__('cookie', function() {
    console.log(`[COOKIES] READ | Caller:`, new Error().stack);
    return document.__proto__.__lookupGetter__('cookie').call(this);
});



