// ==UserScript==
// @name         Double Click to Like YouTube Comments
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Double click on a comment to like. Double click again to remove like.
// @author       votqanh
// @match        *://*.youtube.com/*
// @require      https://code.jquery.com/jquery-latest.min.js
// @require      https://git.io/vMmuf
// @grant        GM_addStyle
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';

    window.addEventListener('load', function() {
        var videoBox = "#comments";
        var notifBox = "ytd-comments.ytd-multi-page-menu-renderer";

        function preventHighlight(el) {
            waitForKeyElements(el, function(jNode) {
                jNode[0].addEventListener('mousedown', function(e) {
                    if (e.detail > 1 && e.target.id != "contenteditable-root") {
                        e.preventDefault();
                    }
                });
            });
        }

        preventHighlight(videoBox);
        preventHighlight(notifBox);


        var cmt = "ytd-comment-renderer#comment";
        var reply = "[is-reply]";

        function addDbl(el) {
            waitForKeyElements(el, function(jNode) {
                jNode[0].addEventListener('dblclick', function(e) {
                    if (e.target.id != "contenteditable-root") {
                        e.target.closest(el).querySelector("#like-button .yt-spec-touch-feedback-shape__fill").click();
                    }
                });
            });
        }

        addDbl(cmt);
        addDbl(reply);
    });
})();
