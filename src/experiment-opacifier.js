import React from 'react';
import PropTypes from 'prop-types';
import Context from './experiment-context';

/*
Component helps to reduce the flickering effect when loading experiments.

Component has timeout functionality built in to cover cases where we have component rapped in
an experiment control and there is no experiment has been configured in the experimentation
platforms.
*/

class ExperimentOpacifier extends React.Component {
  state = {
    opacity: 0,
  }

  /* eslint-disable react/sort-comp */
  timeoutHandle = null;

  handleTimeout = () => {
    this.setState({ opacity: 1 });
  }

  componentDidMount = () => {
    // If the experiment fails to load with in the set time, make the control visible
    this.timeoutHandle = setTimeout(this.handleTimeout, this.props.timeout);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutHandle);
  }

  render = () => {
    const { wrapper: Component, children, transition } = this.props;

    return (
      <Context.Consumer>
        {(experiment) => {
          const opacity = experiment.isActive() ? 1 : this.state.opacity;

          return (
            <Component
              className="experiment__opacity"
              style={{
                transition: `${transition}ms opacity ease`,
                opacity,
              }}
            >
              {children}
            </Component>
          );
        }}
      </Context.Consumer>
    );
  }
}

ExperimentOpacifier.propTypes = {
  wrapper: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  children: PropTypes.node.isRequired,
  transition: PropTypes.number,
};

ExperimentOpacifier.defaultProps = {
  timeout: 250,
  transition: 250,
};

export default ExperimentOpacifier;
