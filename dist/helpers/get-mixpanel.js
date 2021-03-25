'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domExists = require('./dom-exists');

var _domExists2 = _interopRequireDefault(_domExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMixpanel = function getMixpanel() {
  if ((0, _domExists2.default)() && window.mixpanel) {
    // The server is using MP CDN and is responsible for calling init itself
    return window.mixpanel;
  }
  if ((0, _domExists2.default)() && window.browserMixpanel) {
    // Mixpanel has been initialised by initMixpanel
    return window.browserMixpanel;
  }
  try {
    // if this works the consuming component has added mixpanel-browser
    // and is calling init above with its token
    return require('mixpanel-browser'); // eslint-disable-line global-require
  } catch (error) {
    return null;
  }
};

exports.default = getMixpanel;