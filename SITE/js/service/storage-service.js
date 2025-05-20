'use strcit'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function getSearchHistory() {
    const cleanedKeys = new Set();
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (typeof key === "string") {
            // Remove all occurrences of YT_DB and WIKI_DB
            key = key.replace(/YT_DB/g, '').replace(/WIKI_DB/g, '');
            cleanedKeys.add(key);
        }
    }
    console.log(cleanedKeys);
    // Convert Set to Array (optional)
    return Array.from(cleanedKeys);
}
