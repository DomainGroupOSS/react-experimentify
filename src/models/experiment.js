import PropTypes from 'prop-types';

export default {
  activate: PropTypes.func.isRequired,
  controlProps: PropTypes.func.isRequired,
  hasVariant: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  isControl: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  variantProps: PropTypes.func.isRequired,
};
