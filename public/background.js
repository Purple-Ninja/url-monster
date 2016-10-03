// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var tabUrl = encodeURIComponent(tab.url);
  //chrome.tabs.update(tab.id, {url: "http://gadget.chienwen.net/urlmonster/url.php?#u1=" + tabUrl });
  chrome.tabs.update(tab.id, {url: chrome.extension.getURL('index.html#u1='+tabUrl) });
});