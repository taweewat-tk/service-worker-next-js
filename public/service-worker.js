self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker 🤙");
});

const cacheName = "v1";
const cacheClone = async (e) => {
  // FETCH DATA FROM SERVER
  const res = await fetch(e.request);
  // MAKE CLONE OF RESPONSE
  const resClone = res.clone();
  // OPEN CACHE
  const cache = await caches.open(cacheName);
  // ADD RESPONSE TO CACHE
  await cache.put(e.request, resClone);
  return res;
};

self.addEventListener("fetch", (e) => {
  // FETCH FROM CACHE
  e.respondWith(
    cacheClone(e)
      .catch(() => caches.match(e.request)) // IF ERROR OCCURS THEN FETCH FROM CACHE
      .then((res) => res) // IF NO ERROR THEN FETCH FROM SERVER
  );
});

// MANUAL CACHE RESPONSE FROM API
// self.addEventListener("fetch", function (e) {
//   console.log("[Service Worker] Fetch", e.request.url);
//   var dataUrl = "https://pokeapi.co/api/v2/pokemon/ditto";
//   if (e.request.url.indexOf(dataUrl) > -1) {
//     e.respondWith(
//       caches.open(dataCacheName).then(function (cache) {
//         return fetch(e.request).then(function (response) {
//           cache.put(e.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     e.respondWith(
//       caches.match(e.request).then(function (response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });
