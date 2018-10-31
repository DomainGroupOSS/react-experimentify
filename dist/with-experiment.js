'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _setHOCName = require('./helpers/set-HOC-name');

var _setHOCName2 = _interopRequireDefault(_setHOCName);

var _experimentContext = require('./experiment-context');

var _experimentContext2 = _interopRequireDefault(_experimentContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withExperiment = function withExperiment(component) {
  var experimentWrapper = function experimentWrapper(props) {
    return _react2.default.createElement(
      _experimentContext2.default.Consumer,
      null,
      function (experiment) {
        return _react2.default.createElement(component, _extends({}, props, {
          experiment: experiment
        }));
      }
    );
  };

  (0, _setHOCName2.default)(experimentWrapper, component, 'withExperiment');
  return (0, _hoistNonReactStatics2.default)(experimentWrapper, component);
};

exports.default = withExperiment;