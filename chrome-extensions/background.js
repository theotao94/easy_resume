// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  // chrome.storage.sync.set({ color: "#3aa757" }, function () {
  //   console.log("The color is green.");
  // });
  // Called when the user clicks on the browser action.
  // chrome.browserAction.onClicked.addListener(function (tab) {
  // No tabs or host permissions needed!
  //   console.log("Turning " + tab.url + " red!");
  //   chrome.tabs.executeScript({
  //     code: 'document.body.style.backgroundColor="red"',
  //   });
});
