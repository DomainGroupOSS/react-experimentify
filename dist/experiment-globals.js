'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

var _experiment = require('./models/experiment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExperimentGlobals = function ExperimentGlobals(path, controlProps) {
  var _this = this;

  _classCallCheck(this, ExperimentGlobals);

  this.activate = function () {
    return _this.dispatch();
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
    return (0, _has2.default)(global, _this.path);
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
    return (0, _get2.default)(global, _this.path) || null;
  };

  this.path = path;

  if (controlProps) {
    this.controlProps = controlProps;
  }
};

exports.default = ExperimentGlobals;