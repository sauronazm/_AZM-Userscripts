// ==UserScript==
// @name           2ch title fixer.
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    Fixing titles on 2ch.
// @include        http://2ch.hk/*/res/*
// @grant          SKIPPED
// @version        0.0.1
// @source         SKIPPED

// ==/UserScript==


$(document).ready(function () {
    var OPtitle = $('.oppost').find('.filetitle').text();
    if (OPtitle != '') {
        document.title = OPtitle + " — " + document.title;
    }
});