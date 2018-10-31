'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable prefer-destructuring */


var _experiment = require('./models/experiment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Optimizely = function () {
  _createClass(Optimizely, null, [{
    key: 'pushEvent',
    value: function pushEvent(eventName) {
      if (typeof window !== 'undefined') {
        var optimizely = window.optimizely;

        if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
          optimizely.push(['trackEvent', eventName]);
        }
      }
    }
  }, {
    key: 'experimentState',
    value: function experimentState() {
      if (typeof window !== 'undefined' && typeof window.optimizely !== 'undefined' && typeof window.optimizely.data !== 'undefined') {
        return window.optimizely.data.state;
      }

      return undefined;
    }
  }]);

  function Optimizely(experimentId, groupVariants) {
    var _this = this;

    _classCallCheck(this, Optimizely);

    this.listeners = [];

    this.activate = function () {
      var optimizely = window.optimizely;

      if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
        optimizely.push(['activate', _this.experimentId]);
        _this.dispatch();
      }
    };

    this.controlProps = function (controlGroup) {
      if (controlGroup) {
        return _this.groupVariants[controlGroup];
      }

      return controlGroup;
    };

    this.dispatch = function () {
      var experiment = Optimizely.experimentState();

      if (typeof experiment !== 'undefined') {
        _this.listeners.forEach(function (listener) {
          return listener({
            group: experiment.variationIdsMap[_this.experimentId]
          });
        });
      }
    };

    this.hasVariant = function () {
      var variantIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var experiment = Optimizely.experimentState();

      if (typeof experiment === 'undefined') {
        return false;
      }

      if (!_this.isActive()) {
        return false;
      }

      var variations = experiment.variationIdsMap[_this.experimentId] || [];
      var ids = Array.isArray(variantIds) ? variantIds : [variantIds];
      return variations.some(function (variant) {
        return ids.includes(variant);
      });
    };

    this.isActive = function () {
      var experiment = Optimizely.experimentState();

      if (typeof experiment === 'undefined') {
        return false;
      }

      return experiment.activeExperiments.includes(_this.experimentId);
    };

    this.isControl = function (group) {
      var experiment = Optimizely.experimentState();

      if (typeof experiment === 'undefined') {
        return true;
      }

      if (!_this.isActive()) {
        return true;
      }

      var variations = experiment.variationIdsMap[_this.experimentId] || [];
      return variations.length === 0 || variations.some(function (variant) {
        return group === variant;
      });
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

    this.update = function (_ref) {
      var _ref$group = _ref.group,
          group = _ref$group === undefined ? [] : _ref$group;

      var _ref2 = Optimizely.experimentState() || {},
          variationIdsMap = _ref2.variationIdsMap;

      if (typeof variationIdsMap !== 'undefined') {
        variationIdsMap[_this.experimentId] = Array.isArray(group) ? group : [group];
        _this.dispatch();
      }
    };

    this.variantProps = function () {
      var experiment = Optimizely.experimentState();

      if (typeof experiment === 'undefined') {
        return null;
      }

      var _ref3 = experiment.variationIdsMap[_this.experimentId] || [],
          _ref4 = _slicedToArray(_ref3, 1),
          activeVariant = _ref4[0];

      return _this.groupVariants[activeVariant];
    };

    this.experimentId = experimentId;
    this.groupVariants = groupVariants;
  }

  return Optimizely;
}();

exports.default = Optimizely;