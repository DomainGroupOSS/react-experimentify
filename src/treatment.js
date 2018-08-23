// @flow

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Context from './experiment-context';
import { Experiment } from './models/experiment';

class Treatment extends React.Component {
  static propTypes = {
    groups: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    render: PropTypes.func,
  };

  static defaultProps = {
    groups: [],
    children: undefined,
    render: (null: ?(*) => {}),
  };

  componentWillMount() {
    const { render, children } = this.props;

    warning(
      !(render && children),
      // eslint-disable-next-line max-len
      'You should not use <Treatment render> and <Treatment children> in the same treatment; <Treatment children> will be ignored',
    );
  }

  props: {
    groups: Array<string>;
    children: ?React.Children;
    render: ?(props: *) => *;
  }

  render() {
    return (
      <Context.Consumer>
        {(experiment: Experiment) => {
          const { groups, render, children } = this.props;
          const match = experiment.hasVariant(groups);
          const props = experiment.variantProps();

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
        }}
      </Context.Consumer>
    );
  }
}

export default Treatment;
