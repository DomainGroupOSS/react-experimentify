import PropTypes from 'prop-types';

export interface Experiment {
  activate(): void;
  controlProps(controlGroup: ?string): mixed;
  hasVariant(variantIds: Array<string>): boolean;
  isActive(): boolean;
  isControl(group: ?string): boolean;
  subscribe(listener: Function): Function;
  update(group: { group: Array<string> }): void;
  variantProps(): mixed;
}

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
