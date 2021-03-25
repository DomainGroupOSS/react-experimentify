'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMixpanel = require('./get-mixpanel');

var _getMixpanel2 = _interopRequireDefault(_getMixpanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var trackMixpanelExperiment = function trackMixpanelExperiment(experimentName, isVariant) {
  var superPropertyKey = 'experiment-' + experimentName;
  try {
    var mixpanel = (0, _getMixpanel2.default)();
    var hasAlreadyFired = !!mixpanel.get_property(superPropertyKey);

    if (!hasAlreadyFired) {
      var value = isVariant ? 'Variant' : 'Control';

      // set the super property so that we only fire once per device
      mixpanel.register(_defineProperty({}, superPropertyKey, value));

      // the actual event logging which variant is delivered
      mixpanel.track('$experiment_started', {
        'Experiment name': experimentName,
        'Variant name': value

      });
    }
  } catch (error) {
    // log to raygun if globally available
    if (typeof rg4js === 'function') {
      rg4js('send', { error: error, tags: ['mixpanel'], customData: 'Error tracking mixpanel experiment ' + experimentName });
    } else {
      console.error('Error tracking mixpanel experiment ' + experimentName);
    }
  }
};

exports.default = trackMixpanelExperiment;