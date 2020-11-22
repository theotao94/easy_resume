let fill = document.getElementById("fill");

fill.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "fill.js" });
  });
};
