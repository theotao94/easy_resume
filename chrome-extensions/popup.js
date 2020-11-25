let fill = document.getElementById("fill");
let school = document.getElementById("school");

fill.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "fill.js" });
    chrome.tabs.executeScript(tabs[0].id, { code: "a;" });
  });
};

school.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: 'console.log("school");' });
  });
};
