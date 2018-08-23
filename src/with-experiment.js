import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import setHOCDisplayName from './helpers/set-HOC-name';
import Context from './experiment-context';

const withExperiment = (component) => {
  const experimentWrapper = props => (
    <Context.Consumer>
      {experiment => React.createElement(component, {
        ...props,
        experiment,
      })}
    </Context.Consumer>
  );

  setHOCDisplayName(experimentWrapper, component, 'withExperiment');
  return hoistNonReactStatics(experimentWrapper, component);
};

export default withExperiment;
