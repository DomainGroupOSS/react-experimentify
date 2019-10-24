import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Context from './experiment-context';

class Treatment extends React.Component {
  componentDidMount() {
    const { render, children } = this.props;

    warning(
      !(render && children),
      // eslint-disable-next-line max-len
      'You should not use <Treatment render> and <Treatment children> in the same treatment; <Treatment children> will be ignored',
    );
  }

  render() {
    return (
      <Context.Consumer>
        {(experiment) => {
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

const functionOrEmpty = (props, propName, componentName) => {
  if (!(typeof props[propName] === 'function' || props.children)) {
    return new Error(`Invalid prop \`${propName}\` or children passed to \`${componentName}\`. Expected either a render or children prop.`);
  }
  return null;
};

Treatment.propTypes = {
  groups: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  render: functionOrEmpty,
};

Treatment.defaultProps = {
  groups: [],
  children: undefined,
  render: undefined,
};

export default Treatment;
