chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/^http:\/\/(.*)$/, "https://$1")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://i.4cdn.org/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url
      .replace(/^http:\/\/(.*)$/, "https://$1")
      .replace(/^(.*)\.gifv$/, "$1.mp4")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://i.imgur.com/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    let redirectUrl = null

    if ((match = details.url.match(/^https?:\/\/gfycat.com\/([a-z]+)\-?.*$/))) {
      gfyid = match[1]

      redirectUrl = await fetch("https://api.gfycat.com/v1/gfycats/" + gfyid)
        .then((response) => response.json())
        .then((json) => json.gfyItem.mp4Url)
        .catch((error) => console.log(error))

      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://gfycat.com/*"], types: ["main_frame"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    let redirectUrl = null

    if (
      (match = details.url.match(
        /.*redgifs.com\/(..\/)?((watch|detail)\/)+(\w+).*/
      ))
    ) {
      gfyid = match[4]

      redirectUrl = await fetch("https://api.redgifs.com/v1/gfycats/" + gfyid)
        .then((response) => response.json())
        .then((json) => json.gfyItem.mp4Url)
        .catch((error) => console.log(error))

      if (redirectUrl !== details.url) {
        console.log("Unfuck: " + details.url + " => " + redirectUrl)
        return { redirectUrl: redirectUrl }
      }
    }
  },
  {
    urls: ["*://www.redgifs.com/*", "*://redgifs.com/*"],
    types: ["main_frame"],
  },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/^(.*\.jpg)(\:large|)?$/, "$1:orig")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://pbs.twimg.com/media/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/(1e100.link\/)/, "")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://1e100.link/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/(2ch.io\/)/, "")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://2ch.io/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/(l.moapi.net\/)/, "")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://l.moapi.net/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/(.*:\/\/jump.2ch.net\/\?)/, "")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://jump.2ch.net/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    redirectUrl = details.url.replace(/(.*:\/\/l.moapi.net\/\?)/, "")

    if (details.url != redirectUrl) {
      console.log("Unfuck: " + details.url + " => " + redirectUrl)
      return { redirectUrl: redirectUrl }
    }
  },
  { urls: ["*://l.moapi.net/*"] },
  ["blocking"]
)

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === "Referer") {
        details.requestHeaders.splice(i, 1)
        break
      }
    }

    return { requestHeaders: details.requestHeaders }
  },
  { urls: ["*://i.imgur.com/*", "*://stat.ameba.jp/*", "*://stat.7gogo.jp/*"] },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === "User-Agent") {
        details.requestHeaders.splice(i, 1)
        break
      }
    }
    return { requestHeaders: details.requestHeaders }
  },
  { urls: ["*://i.imgur.com/*.mp4"] },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === "Accept") {
        details.requestHeaders[i].value = "image/webp,*/*"
        break
      }
    }
    return { requestHeaders: details.requestHeaders }
  },
  {
    urls: ["*://*.media.tumblr.com/*", "*://transfer.sh/*"],
    types: ["main_frame"],
  },
  ["blocking", "requestHeaders"]
)

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    return {
      responseHeaders: details.responseHeaders.filter((header) => {
        return header.name.toLowerCase() !== "content-disposition"
      }),
    }
  },
  { urls: ["*://transfer.sh/*"] },
  ["blocking", "responseHeaders"]
)
