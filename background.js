
let active = true;

browser.browserAction.setBadgeText({text: (active?'on':'off') });
browser.browserAction.setBadgeBackgroundColor({color: 'green'});

// move tabs into windows when active
browser.tabs.onCreated.addListener( async (tab) => {
	if (active && tab.index !== 0){ // ignore first tab
	  const srcwin = await browser.windows.get(tab.windowId);
	  browser.windows.create({
		  tabId: tab.id, // moves a tab of the specified ID into the new window.
		  incognito: tab.incognito,
		  focused: tab.active,
		  state: srcwin.state,
	  });
	}
});

browser.browserAction.onClicked.addListener((tab) => {
    active = !active; // toggle active state
	browser.browserAction.setBadgeText({text: (active?'on':'off') });
    browser.browserAction.setBadgeBackgroundColor({color: (active?'green':'red')});
});



