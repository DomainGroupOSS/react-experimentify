import Experiment from '../../src/experiment';
import ExperimentOpacifier from '../../src/experiment-opacifier';

const { mount, shallow } = enzyme;
const { stub } = sinon;

describe('experiment-opacifier.js', () => {
  describe('render()', () => {
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

    it('should render with transparent content', () => {
      const wrapper = shallow((
        <Experiment experiment={experiment}>
          <ExperimentOpacifier wrapper={'div'} timeout={200}>
            <p>Child</p>
          </ExperimentOpacifier>
        </Experiment>
      ));

      expect(wrapper).to.not.be.blank();
      expect(wrapper).to.have.style('opacity', '0');
    });

    it('should fall back to non transparent content when experiment fails to load', (done) => {
      experiment.isActive.returns(false);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <ExperimentOpacifier wrapper={'div'} timeout={200}>
            <p>Child</p>
          </ExperimentOpacifier>
        </Experiment>
      ));

      setTimeout(() => {
        expect(wrapper).to.not.be.blank();
        expect(wrapper).to.have.style('opacity', '1');
        done();
      }, 250);
    });

    it('should become non transparent once the experiment is loaded', () => {
      experiment.isActive.returns(true);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <ExperimentOpacifier wrapper={'div'} timeout={200}>
            <p>Child</p>
          </ExperimentOpacifier>
        </Experiment>
      ));

      expect(wrapper).to.not.be.blank();
      expect(wrapper).to.have.style('opacity', '1');
    });
  });
});
