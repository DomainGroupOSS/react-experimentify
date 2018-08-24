const React = require('react');

module.exports = function Explainer() {
  return (
    <div>
      <p style={{ fontWeight: 'bold', marginTop: '80px' }}>
            If any component is not receiving the attention it deserves, time to EXPERIMENTIFY IT!
            The below button will fire a dispatch customEvent like Google Optimize or Optimizely will.
            (<a
              target="_blank"
              rel="noopener noreferrer" // http://www.azarask.in/blog/post/a-new-type-of-phishing-attack/
              href="https://github.com/DomainGroupOSS/react-experimentify#react-experimentify">
              More info on the README
            </a>)
        </p>
    </div>
  );
};
