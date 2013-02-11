// ==UserScript==
// @name           Wikipedia's images cleaner
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    Cleans images URLs on wikipedia (Deletes "?userlang=ru" from URL). 
// @include        http://ru.wikipedia.org/*
// @grant          SKIPPED
// @version        1.0.0
// @source         SKIPPED

// ==/UserScript==

if (typeof _AZM != "object") {
  _AZM = {};
}

_AZM.DeleteUselangParameter = function() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (~links[i].href.toLowerCase().indexOf("?uselang=")) {
    links[i].href = links[i].href.substring(0, links[i].href.toLowerCase().indexOf("?uselang="));
    }
  }
}

setTimeout(_AZM.DeleteUselangParameter, 3000);
