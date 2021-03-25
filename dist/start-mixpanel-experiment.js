'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getMixpanel = require('./helpers/get-mixpanel');

var _getMixpanel2 = _interopRequireDefault(_getMixpanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var startMixpanelExperiment = function startMixpanelExperiment(_ref) {
  var experimentName = _ref.experimentName,
      isVariant = _ref.isVariant,
      _ref$onError = _ref.onError,
      onError = _ref$onError === undefined ? function () {} : _ref$onError,
      _ref$onSuccess = _ref.onSuccess,
      onSuccess = _ref$onSuccess === undefined ? function () {} : _ref$onSuccess;

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

      onSuccess();
    }
  } catch (error) {
    onError(error, 'Error starting mixpanel experiment ' + experimentName);
  }
};

exports.default = startMixpanelExperiment;