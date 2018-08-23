import Experiment from '../../src/experiment';
import Control from '../../src/control';

const { mount } = enzyme;
const stub = sinon.stub;

describe('control.js', () => {
  describe('<Control/>', () => {
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
      experiment.isControl.returns(true);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <Control group="101">
            <p>child</p>
          </Control>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should render children', () => {
      experiment.isControl.returns(true);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <Control group="101">
            <p>child</p>
          </Control>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should render children as a function', () => {
      experiment.isControl.returns(true);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <Control group="101">
            {
            () => <p>child</p>
          }
          </Control>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should call render function', () => {
      experiment.isControl.returns(true);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <Control
            group="101"
            render={() => (
              <p>child</p>
          )}
          />
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should render children with variant props', () => {
      experiment.isControl.returns(true);
      experiment.controlProps.returns({ text: 'control child' });

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <Control group="101">
            {
            ({ text }) => <p>{text}</p>
          }
          </Control>
        </Experiment>
      ));

      expect(wrapper).to.have.text('control child');
    });
  });
});
