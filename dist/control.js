'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _experimentContext = require('./experiment-context');

var _experimentContext2 = _interopRequireDefault(_experimentContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_React$Component) {
  _inherits(Control, _React$Component);

  function Control() {
    _classCallCheck(this, Control);

    return _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).apply(this, arguments));
  }

  _createClass(Control, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          render = _props.render,
          children = _props.children;


      (0, _warning2.default)(!(render && children),
      // eslint-disable-next-line max-len
      'You should not use <Control render> and <Control children> in the same control; <Control children> will be ignored');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          group = _props2.group,
          render = _props2.render,
          children = _props2.children;


      return _react2.default.createElement(
        _experimentContext2.default.Consumer,
        null,
        function (experiment) {
          var match = experiment.isControl(group);

          if (match) {
            var props = experiment.controlProps(group);

            if (render) {
              return render(props);
            } else if (children) {
              if (typeof children === 'function') {
                return children(props);
              }

              return children;
            }
          }

          return null;
        }
      );
    }
  }]);

  return Control;
}(_react2.default.Component);

Control.propTypes = {
  group: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  render: _propTypes2.default.func
};

Control.defaultProps = {
  group: '',
  children: undefined,
  render: undefined
};

exports.default = Control;