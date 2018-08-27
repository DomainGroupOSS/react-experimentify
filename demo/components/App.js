/* eslint-disable react/prop-types */
const React = require('react');
const LoremIpsum = require('react-lorem-component');
const Button = require('./Button');
const Explainer = require('./Explainer');
const { Experiment, Treatment, Control, Optimize, ExperimentOpacifier } = require('../..');

const experiments = [{
  ctaText: 'ctaText'
}]

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);
    this.experiment = new Optimize(props.experimentName);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.experiment.activate();
    this.unsubscribe = this.experiment.subscribe(state => this.setState(state));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick(event) {
    event.preventDefault();
    console.log('clicked');
  }

  handleActivateClick(event) {
    window.dispatchEvent(new CustomEvent('demo_ExperimentName.render', {
      detail: {
        appearance: 'orange',
        ctaText: 'Click here for endless cat videos',
      }
    }));
  }

  render() {
    const { title } = this.props;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <LoremIpsum
          count={2}
          paragraphLowerBound={8}
        />
        <Experiment experiment={this.experiment}>
          <ExperimentOpacifier wrapper={'div'}>
            <Treatment
              render={(variantProps) => (
                <Button onClick={this.handleClick} {...this.props} {...variantProps} />
              )}
            />
            <Control>
              <Button {...this.props} />
            </Control>
          </ExperimentOpacifier>
        </Experiment>
        <LoremIpsum
          count={1}
          paragraphLowerBound={5}
        />
        <div style={{ textAlign: 'center' }}>
          <Explainer />
          <button
            style={{ padding: '20px', borderRadius: '5px' }}
            onClick={this.handleActivateClick}
          >
            Activate button experiment (B Variant)
          </button>
        </div>
      </React.Fragment>
    );
  }
};
