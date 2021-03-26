/**
 * Check if the dom exists - useful for some server-side-rendering applications
 */
const domExists = () => !!(
  typeof window !== 'undefined'
    && window.document
    && window.document.createElement
);

export default domExists;
