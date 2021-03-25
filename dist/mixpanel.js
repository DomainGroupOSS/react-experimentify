'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntersectionObserver = require('react-intersection-observer');

var _trackMixpanelExperiment = require('./helpers/track-mixpanel-experiment');

var _trackMixpanelExperiment2 = _interopRequireDefault(_trackMixpanelExperiment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description
 * This component can be used to conditionally render a component, and will
 * fire the mixpanel event signifying that an experiment has been started.
 *
 * It is designed to only fire as late as possible, i.e. when either the variant,
 * or the control (empty div) is in view.
 */
var MixpanelExperiment = function MixpanelExperiment(_ref) {
  var experimentName = _ref.experimentName,
      showVariant = _ref.showVariant,
      renderVariant = _ref.renderVariant,
      renderControl = _ref.renderControl;

  var _useInView = (0, _reactIntersectionObserver.useInView)(),
      ref = _useInView.ref,
      inView = _useInView.inView;

  (0, _react.useEffect)(function () {
    if (inView) {
      (0, _trackMixpanelExperiment2.default)(experimentName, showVariant);
    }
  }, [inView, experimentName, showVariant]);

  return _react2.default.createElement(
    'div',
    { ref: ref },
    showVariant ? renderVariant() : renderControl()
  );
};

MixpanelExperiment.propTypes = {
  experimentName: _propTypes2.default.string.isRequired,
  showVariant: _propTypes2.default.bool,
  renderVariant: _propTypes2.default.func.isRequired,
  renderControl: _propTypes2.default.func
};

MixpanelExperiment.defaultProps = {
  showVariant: false,
  renderControl: function renderControl() {
    return null;
  }
};

exports.default = MixpanelExperiment;