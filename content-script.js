const connection = chrome.runtime.connect({
  name: 'content-script'
})

connection.postMessage({
  name: 'init'
});

window.addEventListener('message', event => {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  if (event.data && event.data.source === 'simply-redux') {
    connection.postMessage(event.data);
  }
});
