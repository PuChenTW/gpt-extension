chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({
    key: '',
  }, ({ key }) => {
      if (!key) chrome.runtime.openOptionsPage();
  });
});

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
