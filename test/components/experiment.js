import Context from '../../src/experiment-context';
import Experiment from '../../src/experiment';

const { mount } = enzyme;
const stub = sinon.stub;

describe('experiment.js', () => {
  describe('<Experiment/>', () => {
    let experiment;
    let rootContext;

    const ContextChecker = () => (
      <Context.Consumer>
        {(context) => {
          rootContext = context;
          return null;
        }}
      </Context.Consumer>
    );

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

    afterEach(() => {
      rootContext = undefined;
    });

    it('should render', () => {
      const wrapper = mount((
        <Experiment experiment={experiment}>
          <p>child</p>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should render a single child', () => {
      const wrapper = mount((
        <Experiment experiment={experiment}>
          <p>child</p>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should render children if the experiment is inactive', () => {
      experiment.isActive.returns(false);

      const wrapper = mount((
        <Experiment experiment={experiment}>
          <p>child</p>
        </Experiment>
      ));

      expect(wrapper).to.have.text('child');
    });

    it('should throw when rendering multiple children', () => {
      expect(() => {
        mount((
          <Experiment experiment={experiment}>
            <p>multiple</p>
            <p>children</p>
          </Experiment>
        ));
      }).to.throw('An <Experiment> may have only one child element');
    });

    it('should set the context', () => {
      experiment.isActive.returns(true);

      mount((
        <Experiment experiment={experiment}>
          <ContextChecker />
        </Experiment>
      ));

      expect(rootContext).to.equal(experiment);
    });
  });
});
