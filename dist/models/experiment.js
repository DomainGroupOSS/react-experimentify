'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  activate: _propTypes2.default.func.isRequired,
  controlProps: _propTypes2.default.func.isRequired,
  hasVariant: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.func.isRequired,
  isControl: _propTypes2.default.func.isRequired,
  subscribe: _propTypes2.default.func.isRequired,
  update: _propTypes2.default.func.isRequired,
  variantProps: _propTypes2.default.func.isRequired
};