'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _once = require('lodash/once');

var _once2 = _interopRequireDefault(_once);

var _pushToDataLayer = require('./helpers/push-to-data-layer');

var _pushToDataLayer2 = _interopRequireDefault(_pushToDataLayer);

var _experiment = require('./models/experiment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Optimize = function Optimize(experimentName, controlProps) {
  var _this = this;

  _classCallCheck(this, Optimize);

  this.listeners = [];

  this.activate = function (onActivation) {
    _this.addEventListener();

    // Trigger an experiment execute is a async operation hence we need
    // to fire an event from experiment to trigger the rendering from Google Optimize.
    // This way we are ensuring that Optimize had time to execute the script in the exeriment.
    (0, _pushToDataLayer2.default)({ event: _this.experimentName + '.activate' });

    if (typeof onActivation === 'function') {
      onActivation();
    }
  };

  this.addEventListener = (0, _once2.default)(function () {
    if (typeof window !== 'undefined') {
      window.addEventListener(_this.experimentName + '.render', _this.triggerRenderingOfExperiment);
    }
  });

  this.triggerRenderingOfExperiment = function (event) {
    _this.eventData = event.detail;
    _this.dispatch();
  };

  this.controlProps = function () {
    return undefined;
  };

  this.dispatch = function () {
    if (_this.isActive()) {
      _this.listeners.forEach(function (listener) {
        return listener({});
      });
    }
  };

  this.hasVariant = function () {
    return _this.isActive();
  };

  this.isActive = function () {
    return !!_this.eventData;
  };

  this.isControl = function () {
    return !_this.isActive();
  };

  this.subscribe = function (listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    _this.listeners.push(listener);

    var unsubscribe = function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      var index = _this.listeners.indexOf(listener);
      _this.listeners.splice(index, 1);
    };

    return unsubscribe;
  };

  this.update = function () {
    return _this.dispatch();
  };

  this.variantProps = function () {
    return _this.eventData || null;
  };

  this.experimentName = experimentName;

  if (controlProps) {
    this.controlProps = controlProps;
  }
};

exports.default = Optimize;