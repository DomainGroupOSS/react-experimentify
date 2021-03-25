'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Check if the dom exists - useful for some server-side-rendering applications
 */
var domExists = function domExists() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

exports.default = domExists;