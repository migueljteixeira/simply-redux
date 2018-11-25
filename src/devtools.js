chrome.devtools.network.onNavigated.addListener(createPanelIfExtensionIsAvailable)

const checkInterval = setInterval(createPanelIfExtensionIsAvailable, 1000)
createPanelIfExtensionIsAvailable()

function createPanelIfExtensionIsAvailable () {
  chrome.devtools.inspectedWindow.eval(
    '!!(window.__SIMPLY_REDUX__)',
    function (foundExtension) {
      if (!foundExtension) {
        return;
      }

      clearInterval(checkInterval);

      chrome.devtools.panels.create("SimplyRedux", null, "panel.html");
    }
  )
}
