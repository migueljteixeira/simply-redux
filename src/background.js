const connections = {};

chrome.runtime.onConnect.addListener(connection => {
  const connectionListener = (message, sender, sendResponse) => {
    console.log('connectionListener');
    const tabId = message.tabId || sender.sender.tab.id

    if (message.name == 'init') {
      if (!connections[tabId]) {
        connections[tabId] = {
          [sender.name]: connection
        }
      } else {
        connections[tabId][sender.name] = connection;
      }

      return;
    }

    console.log({message})

    let recipient = 'panel';
    if (sender.name === 'panel') {
      recipient = 'content-script';
    }

    if (connections[tabId][recipient]) {
      connections[tabId][recipient].postMessage(message);
    }
  }

  connection.onMessage.addListener(connectionListener);

  connection.onDisconnect.addListener(connection => {
    console.log('removeListener');

    connection.onMessage.removeListener(connectionListener);

    const tabs = Object.keys(connections);
    for (let index=0; index < tabs.length; index++) {
      if (connections[tabs[index]][connection.name] === connection) {
        delete connections[tabs[index]][connection.name]

        break;
      }
    }
  });
});
