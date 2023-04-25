chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({
    key: '',
  }, ({ key }) => {
      if (!key) chrome.runtime.openOptionsPage();
  });
});
