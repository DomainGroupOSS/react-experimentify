const React = require('react');

module.exports = function Button({ onClick, ctaText, appearance }) {
  const styles = {
     margin: '20px',
     padding: '20px',
     borderRadius: '5px',
     backgroundColor	: appearance
  };

  return (
    <button
      onClick={onClick}
      style={styles}
    >
      {ctaText}
  </button>
  );
};
