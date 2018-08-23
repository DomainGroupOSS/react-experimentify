import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Context from './experiment-context';

class Control extends React.Component {
  componentWillMount() {
    const { render, children } = this.props;

    warning(
      !(render && children),
      // eslint-disable-next-line max-len, comma-dangle
      'You should not use <Control render> and <Control children> in the same control; <Control children> will be ignored'
    );
  }

  render() {
    const { group, render, children } = this.props;

    return (
      <Context.Consumer>
        {(experiment) => {
          const match = experiment.isControl(group);

          if (match) {
            const props = experiment.controlProps(group);

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
        }}
      </Context.Consumer>
    );
  }
}

Control.propTypes = {
  group: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  render: PropTypes.func,
};

Control.defaultProps = {
  group: '',
  children: undefined,
  render: undefined,
};

export default Control;
