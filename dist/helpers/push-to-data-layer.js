'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function pushToDataLayer(obj) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) {
    console.warn('Tried to push to the window.dataLayer but it has not been initialized');
    return;
  }

  window.dataLayer.push(obj);
}

exports.default = pushToDataLayer;