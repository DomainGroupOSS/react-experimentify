import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import ExperimentModel from './models/experiment';
import Context from './experiment-context';

class Experiment extends React.Component {
  componentWillMount() {
    const { children } = this.props;

    invariant(
      children == null || React.Children.count(children) === 1,
      'An <Experiment> may have only one child element',
    );
  }

  render() {
    const { children, experiment } = this.props;

    return (
      <Context.Provider value={experiment}>
        { children }
      </Context.Provider>
    );
  }
}

Experiment.propTypes = {
  children: PropTypes.node,
  experiment: PropTypes.shape(ExperimentModel).isRequired,
};

Experiment.defaultProps = {
  children: undefined,
};

export default Experiment;
