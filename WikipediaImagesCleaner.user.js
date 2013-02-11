// ==UserScript==
// @name           Wikipedia's images cleaner
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
// @version        1.0.1
// @source         SKIPPED

// ==/UserScript==

if (typeof _AZM != "object") {
  _AZM = {};
}

_AZM.DeleteUselangParameter = function() {
  var badLinkPart = "?uselang=";
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (~links[i].href.toLowerCase().indexOf(badLinkPart)) {
    links[i].href = links[i].href.substring(0, links[i].href.toLowerCase().indexOf(badLinkPart));
    }
  }
}

setTimeout(_AZM.DeleteUselangParameter, 3000);
