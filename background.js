chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/^http:\/\/(.*)$/,"https://$1") };
},{ urls: [ "*://i.4cdn.org/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/^http:\/\/(.*)$/,"https://$1").replace(/^(.*)\.gifv$/,"$1.mp4") };
},{ urls: [ "*://i.imgur.com/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/^(.*\.jpg)(\:large|)?$/,"$1:orig") };
},{ urls: [ "*://pbs.twimg.com/media/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/(1e100.link\/)/,"") };
},{ urls: [ "*://1e100.link/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/(l.moapi.net\/)/,"") };
},{ urls: [ "*://l.moapi.net/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/(.*:\/\/jump.2ch.net\/\?)/,"") };
},{ urls: [ "*://jump.2ch.net/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: details.url.replace(/(.*:\/\/l.moapi.net\/\?)/,"") };
},{ urls: [ "*://l.moapi.net/*" ] }, [ "blocking" ]);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Referer') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    }, {urls: ["*://i.imgur.com/*", "*://stat.ameba.jp/*", "*://stat.7gogo.jp/*"]}, ["blocking", "requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    }, {urls: ["*://i.imgur.com/*.mp4"]}, ["blocking", "requestHeaders"]);
