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

var Treatment = function (_React$Component) {
  _inherits(Treatment, _React$Component);

  function Treatment() {
    _classCallCheck(this, Treatment);

    return _possibleConstructorReturn(this, (Treatment.__proto__ || Object.getPrototypeOf(Treatment)).apply(this, arguments));
  }

  _createClass(Treatment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          render = _props.render,
          children = _props.children;


      (0, _warning2.default)(!(render && children),
      // eslint-disable-next-line max-len
      'You should not use <Treatment render> and <Treatment children> in the same treatment; <Treatment children> will be ignored');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _experimentContext2.default.Consumer,
        null,
        function (experiment) {
          var _props2 = _this2.props,
              groups = _props2.groups,
              render = _props2.render,
              children = _props2.children;

          var match = experiment.hasVariant(groups);
          var props = experiment.variantProps();

          if (match) {
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

  return Treatment;
}(_react2.default.Component);

var functionOrEmpty = function functionOrEmpty(props, propName, componentName) {
  if (!(typeof props[propName] === 'function' || props.children)) {
    return new Error('Invalid prop `' + propName + '` or children passed to `' + componentName + '`. Expected either a render or children prop.');
  }
  return null;
};

Treatment.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  render: functionOrEmpty
};

Treatment.defaultProps = {
  groups: [],
  children: undefined,
  render: undefined
};

exports.default = Treatment;