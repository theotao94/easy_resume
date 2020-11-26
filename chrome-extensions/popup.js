let fill = document.getElementById("fill");
let school = document.getElementById("school");

fill.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "fill.js" });
    // chrome.tabs.executeScript(tabs[0].id, { code: "fillInfo()" });
    //  chrome.extension.getBackgroundPage().start();
    //  chrome.extension.currentWindow.fillInfo();

  });
};

school.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // chrome.tabs.executeScript(tabs[0].id, { code: 'console.log("school");' });
    chrome.extension.getBackgroundPage().fillSchool();

  });
};
