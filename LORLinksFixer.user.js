// ==UserScript==
// @name           LOR Links Fixer
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    Deletes "#comments" from links on linux.org.ru web site.  
// @include        http://linux.org.ru/*
// @include        http://www.linux.org.ru/*
// @include        https://linux.org.ru/*
// @include        https://www.linux.org.ru/*
// @grant          SKIPPED
// @version        1.0.1
// @source         SKIPPED

// ==/UserScript==

(function() {
    "use strict";
    var _AZMFixLORLinks = function() {
        var badLinkPart = "#comments";
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.toLowerCase().indexOf(badLinkPart) > -1) {
                links[i].href = links[i].href.substring(0, links[i].href.toLowerCase().indexOf(badLinkPart));
            }
        }
    };

    addEventListener('load',  _AZMFixLORLinks, false );
})();