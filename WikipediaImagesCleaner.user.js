// ==UserScript==
// @name           Wikipedia's Images Cleaner
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    Cleans images URLs on wikipedia (Deletes "?userlang=ru" from URL). 
// @include        http://ru.wikipedia.org/*
// @include        https://ru.wikipedia.org/*
// @include        http://www.ru.wikipedia.org/*
// @include        https://www.ru.wikipedia.org/*
// @grant          SKIPPED
// @version        1.0.2
// @source         SKIPPED

// ==/UserScript==

(function() {
    "use strict";
    var _AZMDeleteUselangParameter = function() {
        var badLinkPart = "?uselang=";
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.toLowerCase().indexOf(badLinkPart) > -1) {
            links[i].href = links[i].href.substring(0, links[i].href.toLowerCase().indexOf(badLinkPart));
            }
        }
    };

    addEventListener('load', _AZMDeleteUselangParameter, false);
})();