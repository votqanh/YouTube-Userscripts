// ==UserScript==
// @name         Double Click to Like YouTube Comments
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Double click on a comment to like. Double click again to remove like.
// @author       votqanh
// @match        *://*.youtube.com/*
// @icon         https://t4.ftcdn.net/jpg/02/64/18/21/360_F_264182169_79nqopuqFnMqbeLw3c7u0CiFW5Cwj1ah.jpg
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=19641
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        var videoBox = "#sections";
        var notifBox = "ytd-comments.ytd-multi-page-menu-renderer"

        function removeHighlight(el) {
            waitForKeyElements(el, function(e) {
                document.querySelector(el).addEventListener('mousedown', function(e) {
                    if (e.detail > 1 && e.target.id != "contenteditable-root") {
                        e.preventDefault();
                    }
                });
            });
        }

        removeHighlight(videoBox);
        removeHighlight(notifBox);


        var cmt = "ytd-comment-renderer#comment";
        var reply = "[is-reply]"

        function waitFor(el) {
            function like(e) {
                if (e.target.id != "contenteditable-root") {
                    e.target.closest(el).querySelector("#like-button").click();
                }
            }

            waitForKeyElements(el, function (jNode) {
                jNode[0].addEventListener('dblclick', like);
            });
        }

        waitFor(cmt);
        waitFor(reply);
    });
})();
