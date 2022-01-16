var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    "index.html",
    "style.css",
    "img/logo512.png",
    "img/logo128.png",
    "js/main.js",
    "js/general-functions.js",
    "js/puzzle-creation-functions.js",
    "js/solution-creation-functions.js",
    "js/solving-functions.js",
    "js/testing.js",
    "js/solving-methods-js/hidden-subsets.js",
    "js/solving-methods-js/locked-candidates.js",
    "js/solving-methods-js/lone-rangers.js",
    "js/solving-methods-js/naked-subsets.js",
    "js/solving-methods-js/singles.js",
    "js/display.js",
    "js/local-storage.js",
    "js/current-puzzle.js",
    "js/hint-functions.js",
    "js/fake-data.js",
    "js/fetch.js",
    "js/navigation-functions.js",
    "js/init.js",
    "js.js",
    "js/validation.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request)
            .then(
            function(response) {
                if(!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                var responseToCache = response.clone();
                caches.open(CACHE_NAME)
                .then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});


/*self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
        // TODO 4 - Add fetched files to the cache
  
      }).catch(error => {
  
        // TODO 6 - Respond with custom offline page
  
      })
    );
  });*/
