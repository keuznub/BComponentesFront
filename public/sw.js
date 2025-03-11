const version = 'v1';

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(version);
  await cache.addAll(resources);
};

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
  
    if (responseFromCache) {
        console.log("Cache first");
      return responseFromCache;
    }
    const response = await fetch(request)
    
    putInCache(request,response.clone())
    console.log("Network first");
    return response
};


const putInCache = async (request, response) => {
    const cache = await caches.open(version);
    
    if (!request.url.startsWith('http')) {
        console.log('No se puede almacenar en caché la URL: ' + request.url);
        return;
      }

    if (request.method !== 'GET') {
      console.log('Cannot cache non-GET requests');
      return;
    }
  
    await cache.put(request, response.clone());
  };
  

self.addEventListener('install', (event) => {
  console.log(`${version} installing...`);

  event.waitUntil(
    addResourcesToCache([
      '/',
      ])
  );
});



self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
  });