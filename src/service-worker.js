import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

skipWaiting();
clientsClaim();

registerRoute(
  new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
  new CacheFirst({
    cacheName: 'image-cache',
  }),
  'GET'
);

//new NavigationRoute('/index.html');

// The precache routes for workbox-webpack-plugin
//precacheAndRoute(self.__WB_MANIFEST);

// listen to the install event
self.addEventListener('install', event => console.log('SW installed', event));
