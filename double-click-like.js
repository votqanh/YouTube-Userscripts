// ==UserScript==
// @name         Double Click to Like YouTube Comments
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Double click on a comment to like. Double click again to remove like.
// @author       votqanh
// @match        *://*.youtube.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        var cmtSection = "#sections";
        var notifCmt = "ytd-comments.ytd-multi-page-menu-renderer"

        function removeHighlight(el) {
            waitForKeyElements(el, function(e) {
                document.querySelector(el).addEventListener('mousedown', function(e) {
                    if (e.detail > 1 && e.target.id != "contenteditable-root") e.preventDefault()
                });
            });
        }

        removeHighlight(cmtSection);
        removeHighlight(notifCmt);


        var cmt = "ytd-comment-renderer#comment";
        var reply = "[is-reply]"

        function waitFor(el) {
            var cnt = 0;

            function addDbl(e) {
                if (e.target.id != "contenteditable-root") event.target.closest(el).querySelector("#like-button").click()
            }

            waitForKeyElements(el, function() {
                var item = document.querySelectorAll(el)[cnt];

                item.addEventListener('dblclick', addDbl);

                cnt++;
            });
        }

        waitFor(cmt);
        waitFor(reply);
    });
})();
