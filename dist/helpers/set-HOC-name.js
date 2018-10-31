'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getComponentName = require('./get-component-name');

var _getComponentName2 = _interopRequireDefault(_getComponentName);

var _setComponentName = require('./set-component-name');

var _setComponentName2 = _interopRequireDefault(_setComponentName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets the React display name for higher-order components for better debugging messages and readability
 * in React dev tools. The convention for formatting these names is: `wrapperName(WrappedComponentName)`.
 *
 * @param {Component} - The higher order component class or function to set the display name for.
 * @param {Component} - The component being wrapped.
 * @param {string} - The name to display for the wrapper.
 */
/* eslint-disable max-len */
function setHOCDisplayName(Component, WrappedComponent, name) {
  // Component(WrappedComponent);
  (0, _setComponentName2.default)(Component, name + '(' + (0, _getComponentName2.default)(WrappedComponent) + ')');
}

exports.default = setHOCDisplayName;