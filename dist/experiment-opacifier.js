'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _experimentContext = require('./experiment-context');

var _experimentContext2 = _interopRequireDefault(_experimentContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Component helps to reduce the flickering effect when loading experiments.

Component has timeout functionality built in to cover cases where we have component rapped in
an experiment control and there is no experiment has been configured in the experimentation
platforms.
*/

var ExperimentOpacifier = function (_React$Component) {
  _inherits(ExperimentOpacifier, _React$Component);

  function ExperimentOpacifier() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExperimentOpacifier);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExperimentOpacifier.__proto__ || Object.getPrototypeOf(ExperimentOpacifier)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      opacity: 0

      /* eslint-disable react/sort-comp */
    }, _this.timeoutHandle = null, _this.handleTimeout = function () {
      _this.setState({ opacity: 1 });
    }, _this.componentDidMount = function () {
      // If the experiment fails to load with in the set time, make the control visible
      _this.timeoutHandle = setTimeout(_this.handleTimeout, _this.props.timeout);
    }, _this.componentWillUnmount = function () {
      clearTimeout(_this.timeoutHandle);
    }, _this.render = function () {
      var _this$props = _this.props,
          Component = _this$props.wrapper,
          children = _this$props.children,
          transition = _this$props.transition;


      return _react2.default.createElement(
        _experimentContext2.default.Consumer,
        null,
        function (experiment) {
          var opacity = experiment.isActive() ? 1 : _this.state.opacity;

          return _react2.default.createElement(
            Component,
            {
              className: 'experiment__opacity',
              style: {
                transition: transition + 'ms opacity ease',
                opacity: opacity
              }
            },
            children
          );
        }
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ExperimentOpacifier;
}(_react2.default.Component);

ExperimentOpacifier.propTypes = {
  wrapper: _propTypes2.default.string.isRequired,
  timeout: _propTypes2.default.number,
  children: _propTypes2.default.node.isRequired,
  transition: _propTypes2.default.number
};

ExperimentOpacifier.defaultProps = {
  timeout: 250,
  transition: 250
};

exports.default = ExperimentOpacifier;