chrome.action.onClicked.addListener((tab) => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({
    key: '',
  }, ({ key }) => {
    if (!key) chrome.runtime.openOptionsPage();
  });
});
