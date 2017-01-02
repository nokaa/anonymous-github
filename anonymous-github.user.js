// Copyright (C)  2016 nokaa <nokaa@cock.li>
// This software is licensed under the terms of the
// GNU General Public License version 3. You should have
// received a copy of this license with this software.
// The license may also be found at https://gnu.org/licenses/gpl.txt

// ==UserScript==
// @name        anonymous-github
// @version     1.0.1
// @namespace   anonymous-github
// @description Makes certain aspects of Github anonymous, with the goal of meritocracy.
// @license     GPLv3, https://gnu.org/licenses/gpl.txt
// @include     https://github.com/*
// @include     http://github.com/*
// @grant       none
// @updateURL   https://raw.githubusercontent.com/nokaa/anonymous-github/master/anonymous-github.user.js
// @downloadURL https://raw.githubusercontent.com/nokaa/anonymous-github/master/anonymous-github.user.js
// ==/UserScript==

/**
 * Analogous to `document.getElementsByClassName` but returns
 *  an array instead of an HTMLCollection.
 */
function getElementsByClassName(className) {
    const items = document.getElementsByClassName(className);
    let elements = [];
    for (let i = 0; i < items.length; i++) {
        elements.push(items[i]);
    }
    return elements;
}

/** 
 * Analogous to `document.getElementsByTagName` but returns
 *  an array instead of an HTMLCollection.
 */
function getElementsByTagName(tagName) {
    const tags = document.getElementsByTagName(tagName);
    let elements = [];
    for (let i = 0; i < tags.length; i++) {
        elements.push(tags[i]);
    }
    return elements;
}

/**
 * Replace names in comments with "Anonymous".
 */
let names = getElementsByTagName("a").filter(function(x) {
    return x.className.includes("author");
});

names.map(elem => elem.innerHTML = "Anonymous");

/**
 * Remove the "Contributor" badge from comments.
 */
getElementsByClassName("timeline-comment-label").map(elem => elem.remove());

/**
 * Replace all avatars with the user's avatar.
 */
let avatars = getElementsByClassName("avatar");
// Get the url of the high quality version of the user's avatar.
const avatar_src = avatars[0].src.replace(/s\=[\d]+/, "s=460");

avatars.map(elem => elem.src = avatar_src);

getElementsByClassName("timeline-comment-avatar").map(elem => elem.src = avatar_src);

/**
 * Remove reactions to comments.
 */
// Remove reactions.
getElementsByClassName("comment-reactions").map(elem => elem.remove());

// Remove reactions menu.
getElementsByClassName("timeline-comment-actions").map(elem => elem.remove());
