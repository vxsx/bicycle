/**
* Component for tracking events with Yandex.Metrica (and ga in future)
*
* Unfortunately, you still need to have yandex metrika initialization on
* the page, since their bot is checking the counter availability this way.
* So you still have to insert the usual counter code but prepend
*
*   if (navigator.userAgent.indexOf('YandexMetrika') > -1)
*
* There should always be a config.js with counters ids
*
*   config = {
*       analytics: {
*            yandex: '11111111',
*            google: "UA-11111111-1"
*       }
*   }
*/
define([
    'config'
], function (config) {

    var deferredEvents = [];

    /**
    * @function trackEvent
    * @param {Object} event params of the event => { category: '', action: '', params: {} }
    * @param {String} event.category
    * @param {String} event.action
    * @param {Object} [event.params] optional params
    */
    function trackEvent (event) {
        if (typeof window[config.analytics.yandex]  === 'object') {
            window[config.analytics.yandex].reachGoal(event.category + '_' + event.action, params);
        } else {
            deferredEvents.push(event);
        }
    }

    function initYandexMetrika () {
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function () {
                try {
                    w[yaCounter + config.analytics.yandex] = new Ya.Metrika({
                        id: config.analytics.yandex,
                        clickmap: true
                    });
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script"),
                f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.onload = function () {
                if (deferredEvents && deferredEvents.length) {
                    deferredEvents.forEach(function (event) {
                        trackEvent(event);
                    });
                }
            };
            s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
    }

    function initGoogleAnalytics () {
        //TODO
    }

    function initCounters () {
        initYandexMetrika();
    }

    initCounters();

    return {
        trackEvent: trackEvent,
        initCounters: initCounters
    };
});
