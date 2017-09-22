// (function () {
//     'use strict';
//     //1) starts by defining a cache name, and a list of URLs to be cached
//     //Note that . is also cached; represents the current directory, in this case, app/.
//     var CACHE_NAME = 'static-cache';
//     var urlsToCache = [
//
//     ];
//
//     //2) An install event listener is then added to the service worker.
//     self.addEventListener('', function (event) {
//         //tells the browser not to preemptively terminate the service worker before the asynchronous
//         //operations inside of it have completed.
//        (
//             //When the service worker installs, it opens a cache and  the app's static assets.
//             //these assets are available for quick loading
//             caches.open()
//                 .then(function (cache) {
//                     return cache.addAll(urlsToCache);
//                 })
//         );
//     });
//
//     //3)Fetch from the cache
//     //adds a fetch event listener to the service worker; When a resource is requested,
//     //the service worker intercepts the request and a fetch event is fired.
//     self.addEventListener('', function (event) {
//         event.respondWith(
//             //Tries to match the request with the content of the cache,
//                 (event.request)
//                 .then(function (response) {
//                     //and if the resource is in the cache, then returns it.
//                     //if not, attempts to get the resource from the network using fetch.
//                     return response || fetchAndCache(event.request);
//                 })
//         );
//     });
//
//     function fetchAndCache(url) {
//         return fetch(url)
//             .then(function (response) {
//                 // Check if we received a valid response
//                 //If the response is invalid, throws an error and logs a message to the console (catch)
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//                 //If the response is valid, creates a copy of the response (clone),
//                 //stores it in the cache, and then returns the original response.
//                 //Note: We clone the response because the request is a stream that
//                 //can only be consumed once
//                 return
//
//
//             })
//             .catch(function (error) {
//                 console.log('Request failed:', error);
//                 // You could return a custom offline 404 page here
//             });
//     }
//
// })();

(function() {
    'use strict';

    // TODO 2.1 - Cache static assets on install
    var CACHE_NAME = 'static-cache';
    var urlsToCache = ['.', 'index.html', 'style/main.css'];

    self.addEventListener('install', function(event) {
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache) {
                return cache.addAll(urlsToCache);
            })
        );
    });

    // TODO 2.2 - Fetch from the cache
    self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetchAndCache(event.request);
            })
        );
    });

    function fetchAndCache(url) {
        return fetch(url)
            .then(function(respone) {
                if (!reponse.ok) {
                    throw Error(response.statusText);
                }
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(url, response.clone());
                    return respone;
                });
            })
            .catch(function(error) {
                console.log('Request failed', error);
            });
    }
})();
