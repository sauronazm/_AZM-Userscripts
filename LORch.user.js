// ==UserScript==
// @name           LOR 2ch comments style
// @namespace      SKIPPED
// @updateURL      SKIPPED
// @require        SKIPPED
// @author         Sauron_AZM (sauronazm@gmail.com)
// @description    SKIPPED
// @include        http://linux.org.ru/forum/*
// @include        http://www.linux.org.ru/forum/*
// @include        https://linux.org.ru/forum/*
// @include        https://www.linux.org.ru/forum/*
// @grant          SKIPPED
// @version        1.0.1
// @source         SKIPPED

// ==/UserScript==

/*jshint newcap: false */
(function() {
    "use strict";
    var _AZMch = function() {
        var links = $(".title a");
        for (var i = 0; i < links.length; i++) {
            var originalMsgID = links[i].href.substring(links[i].href.indexOf('=') + 1);
            var helpMsg = $("article[id$=" + originalMsgID + "]").clone();
            if (helpMsg.length > 0) {
                helpMsg.addClass("helpMsg");
                helpMsg.css("display", "none");
                helpMsg.css("position", "absolute");
                helpMsg.css("background-color", "#F0F0F0");
                helpMsg.css("border", "1px solid #555");
                helpMsg.css("border-radius", "10px");
                helpMsg.appendTo(document.body);
                SetHelper(links[i], helpMsg);
            }
        }
    };
    
    function SetHelper(item, msg) {
        $(item).hover(
            function(e) {
                $(".helpMsg").hide();
                msg.css("left", e.pageX + "px");
                msg.css("top", e.pageY + "px");
                msg.show();
            },
            function() {
                $(".helpMsg").hide();
            }
        );
    }
    
    addEventListener('load',  _AZMch, false );
})();