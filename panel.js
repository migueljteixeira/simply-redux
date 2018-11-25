var connection = chrome.runtime.connect({
  name: 'panel'
});

connection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

connection.onMessage.addListener((message, sender, sendResponse) => {
  console.log('panel', message);
});
