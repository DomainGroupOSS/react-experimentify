import Optimize from '../../src/optimize';

const { spy } = sinon;

let sandbox;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  sandbox.restore();
});

describe('optimize.js', () => {
  describe('activate()', () => {
    it('should dispatch activation', () => {
      const listener = sinon.spy();
      const experiment = new Optimize('OptimizeDemoExperiment');
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(listener).to.have.callCount(1);
    });

    it('should use a callback function if provided', () => {
      const onActivation = sinon.spy();
      const experiment = new Optimize('OptimizeDemoExperiment');
      experiment.activate(onActivation);

      expect(onActivation).to.have.been.called();
    });
  });

  describe('controlProps()', () => {
    it('should return control props', () => {
      const experiment = new Optimize('OptimizeDemoExperiment', () => ({
        foo: 'bar',
      }));

      expect(experiment.controlProps('100')).to.eql({ foo: 'bar' });
    });
  });

  describe('hasVariant()', () => {
    it('should be false if OptimizeDemoExperiment.render event was not raised', () => {
      window.feCoOptimizeExperiment = undefined;
      const experiment = new Optimize('OptimizeDemoExperiment');

      expect(experiment.hasVariant()).to.equal(false);
    });
  });

  describe('isActive()', () => {
    it('should be false if OptimizeDemoExperiment.render event was not raised', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');

      expect(experiment.isActive()).to.equal(false);
    });

    it('should be true if the experiment is active', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');
      const listener = spy();
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(experiment.isActive()).to.equal(true);
    });
  });

  describe('isControl()', () => {
    it('should be true if OptimizeDemoExperiment.render event was not raised', () => {
      window.feCoOptimizeExperiment = undefined;
      const experiment = new Optimize('OptimizeDemoExperiment');

      expect(experiment.isControl()).to.equal(true);
    });

    it('should be false if a variant is active', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');
      const listener = spy();
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(experiment.isControl()).to.equal(false);
    });

    it('should be true if experiment is inactive', () => {
      window.feCoOptimizeExperiment = undefined;
      const experiment = new Optimize('OptimizeDemoExperiment');

      expect(experiment.isControl()).to.equal(true);
    });
  });

  describe('subscribe()', () => {
    it('should subscribe a listener', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');
      const listener = spy();
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(listener).to.have.been.calledWith({});
    });

    it('should throw if listener is not a function', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');

      expect(() => experiment.subscribe()).to.throw('Expected listener to be a function.');
    });

    it('should return an unsubscribe function', () => {
      const listener = spy();
      const experiment = new Optimize('OptimizeDemoExperiment');
      const unsubscribe = experiment.subscribe(listener);

      expect(unsubscribe).to.be.a('function');
    });
  });

  describe('update()', () => {
    it('should do nothing if OptimizeDemoExperiment.render event was not raised', () => {
      window.feCoOptimizeExperiment = undefined;
      const listener = spy();
      const experiment = new Optimize('OptimizeDemoExperiment');
      experiment.subscribe(listener);
      experiment.update();

      expect(listener).to.have.callCount(0);
    });

    it('should dispatch changes', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');
      const listener = spy();
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(listener).to.have.been.calledWith();
    });
  });

  describe('variantProps()', () => {
    it('should return null if OptimizeDemoExperiment.render event was not raised', () => {
      window.feCoOptimizeExperiment = undefined;
      const experiment = new Optimize('OptimizeDemoExperiment');
      expect(experiment.variantProps()).to.equal(null);
    });

    it('should return variant props from the globally defined variant', () => {
      const experiment = new Optimize('OptimizeDemoExperiment');
      const listener = spy();
      experiment.subscribe(listener);
      experiment.activate();
      window.dispatchEvent(new window.CustomEvent('OptimizeDemoExperiment.render',
        { detail: { foo: 'bar' } }),
      );

      expect(experiment.variantProps()).to.eql({ foo: 'bar' });
    });
  });
});
