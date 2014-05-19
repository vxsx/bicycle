/**
* Adapted from jquery.browser which was removed
* in jQuery 1.9, [documentation here](http://api.jquery.com/jQuery.browser/)
*
* @module Browser
*/
define([], function () {
    /**
    * Contains flags for the useragent, read from navigator.userAgent
    *
    * @class Browser
    * @static
    */
    var Browser = (function () {
        function uaMatch (ua) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];

            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }

        var matched = uaMatch(navigator.userAgent),
            browser = {};

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        return browser;
    }());

    return Browser;
});
