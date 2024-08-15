// ==UserScript==
// @name        Double Click to Like YouTube Comments
// @namespace   http://tampermonkey.net/
// @version     2.0
// @description Double click on a comment to like. Double click again to remove like.
// @author      votqanh
// @match       *://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    function addDblClickHandler(el) {
        const commentsContainer = document.querySelector('body');
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.querySelector(el)) {
                        node.addEventListener('dblclick', function(e) {
                            // if not double clicking in input field
                            if (e.target.id !== "contenteditable-root") {
                                const likeButton = e.target.closest(el)?.querySelector("#like-button .yt-spec-touch-feedback-shape__fill");
                                if (likeButton) {
                                    likeButton.click();
                                }
                            }
                        });

                        // prevent highlight when double clicking
                        node.addEventListener('mousedown', function(e) {
                            if (e.detail > 1 && e.target.id !== "contenteditable-root") {
                                e.preventDefault();
                            }
                        });
                    }
                });
            });
        });

        const config = { childList: true, subtree: true };
        observer.observe(commentsContainer, config);
    }

    const cmt = "ytd-comment-thread-renderer #comment";
    const reply = "#main.ytd-comment-view-model";

    addDblClickHandler(cmt);
    addDblClickHandler(reply);
})();
