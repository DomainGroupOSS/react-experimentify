import Experiment from '../../src/experiment';
import withExperiment from '../../src/with-experiment';

const { mount } = enzyme;
const stub = sinon.stub;

const child = () => (<p>child</p>);

describe('with-experiment.js', () => {
  let experiment;

  beforeEach(() => {
    experiment = stub({
      activate() {},
      controlProps() {},
      hasVariant() {},
      isActive() {},
      isControl() {},
      pushEvent() {},
      subscribe() {},
      update() {},
      variantProps() {},
    });
  });

  it('should render', () => {
    const Component = withExperiment(child);
    const wrapper = mount((
      <Experiment experiment={experiment}>
        <Component />
      </Experiment>
    ));

    expect(wrapper.find('child')).be.present();
  });

  it('should inject the current experiment', () => {
    const Component = withExperiment(child);
    const wrapper = mount((
      <Experiment experiment={experiment}>
        <Component />
      </Experiment>
    ));

    expect(wrapper.find('child').props().experiment).to.be.an('object');
    expect(wrapper.find('child').props().experiment).to.include.keys('pushEvent');
  });
});
