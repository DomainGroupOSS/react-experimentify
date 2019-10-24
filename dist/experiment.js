'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _experiment = require('./models/experiment');

var _experiment2 = _interopRequireDefault(_experiment);

var _experimentContext = require('./experiment-context');

var _experimentContext2 = _interopRequireDefault(_experimentContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Experiment = function (_React$Component) {
  _inherits(Experiment, _React$Component);

  function Experiment() {
    _classCallCheck(this, Experiment);

    return _possibleConstructorReturn(this, (Experiment.__proto__ || Object.getPrototypeOf(Experiment)).apply(this, arguments));
  }

  _createClass(Experiment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var children = this.props.children;


      (0, _invariant2.default)(children == null || _react2.default.Children.count(children) === 1, 'An <Experiment> may have only one child element');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          experiment = _props.experiment;


      return _react2.default.createElement(
        _experimentContext2.default.Provider,
        { value: experiment },
        children
      );
    }
  }]);

  return Experiment;
}(_react2.default.Component);

Experiment.propTypes = {
  children: _propTypes2.default.node,
  experiment: _propTypes2.default.shape(_experiment2.default).isRequired
};

Experiment.defaultProps = {
  children: undefined
};

exports.default = Experiment;