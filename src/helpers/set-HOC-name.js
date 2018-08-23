/* eslint-disable max-len */
import getComponentName from './get-component-name';
import setComponentName from './set-component-name';

/**
 * Sets the React display name for higher-order components for better debugging messages and readability
 * in React dev tools. The convention for formatting these names is: `wrapperName(WrappedComponentName)`.
 *
 * @param {Component} - The higher order component class or function to set the display name for.
 * @param {Component} - The component being wrapped.
 * @param {string} - The name to display for the wrapper.
 */
function setHOCDisplayName(Component, WrappedComponent, name) {
  // Component(WrappedComponent);
  setComponentName(Component, `${name}(${getComponentName(WrappedComponent)})`);
}

export default setHOCDisplayName;
