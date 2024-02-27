// ==UserScript==
// @name         Move YouTube Comments
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Move YouTube Comments to where live chat would be and put them in an infinite scroll box
// @author       votqanh
// @match        *://*.youtube.com/*
// @exclude      *://*.youtube.com/playlist*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var comments = "#sections.ytd-comments:not([static-comments-header])"

    window.addEventListener('load', () => {

        waitForKeyElements(comments, () => {

            comments = document.querySelector(comments);
            var container = document.getElementById("secondary-inner");

            container.prepend(comments);

            const styles = {
                display: 'block',
                padding: '5px',
                width: '100%',
                height: '470px',
                overflowY: 'scroll',
                marginBottom: '20px'
            }

            Object.assign(comments.style, styles);

            var header = "ytd-comments-header-renderer";

            waitForKeyElements(header, () => {document.querySelector(header).style.marginTop = "0px"});

            var loadCmt = "yt-next-continuation.ytd-item-section-renderer";

            comments.addEventListener('scroll', () => {
                if (comments.scrollHeight - comments.scrollTop === comments.clientHeight) {
                   document.querySelector(loadCmt).trigger();
                }
            });
        });
    });
})();
