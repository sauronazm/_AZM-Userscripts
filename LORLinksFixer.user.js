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
// @version        1.0.0
// @source         SKIPPED

// ==/UserScript==

if (typeof _AZM != "object") {
  _AZM = {};
}

_AZM.FixLORLinks = function() {
  var badLinkPart = "#comments";
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (~links[i].href.toLowerCase().indexOf(badLinkPart)) {
    links[i].href = links[i].href.substring(0, links[i].href.toLowerCase().indexOf(badLinkPart));
    }
  }
}

setTimeout(_AZM.FixLORLinks, 2000);
