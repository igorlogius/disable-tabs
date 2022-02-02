
browser.browserAction.setBadgeText({text: 'on' });
browser.browserAction.setBadgeBackgroundColor({color: 'green'});

const inactive_windows = new Set();

// move tabs into new windows
browser.tabs.onCreated.addListener( async (tab) => {
    if(!inactive_windows.has(tab.windowId)){
        if (tab.index !== 0){ // ignore first tab
            const srcwin = await browser.windows.get(tab.windowId);
            browser.windows.create({
                tabId: tab.id, // moves a tab into the new window
                incognito: tab.incognito,
                focused: tab.active,
                state: srcwin.state,
            });
        }
    }
});

browser.browserAction.onClicked.addListener((tab) => {
    if(inactive_windows.has(tab.windowId)) {
        inactive_windows.delete(tab.windowId);
    	browser.browserAction.setBadgeText({tabId: tab.id, text: 'on' });
        browser.browserAction.setBadgeBackgroundColor({tabId: tab.id, color: 'green'});
    }else{
        inactive_windows.add(tab.windowId);
    	browser.browserAction.setBadgeText({tabId: tab.id, text: 'off' });
        browser.browserAction.setBadgeBackgroundColor({tabId: tab.id, color: 'red'});
    }
});

browser.windows.onRemoved.addListener((windowId) => {
    if(inactive_windows.has(windowId)) {
        inactive_windows.delete(tab.windowId); // cleanup
    }
});
