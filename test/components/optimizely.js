import Optimizely from '../../src/optimizely';

const { spy } = sinon;

describe('optimizely.js', () => {
  const pushSpy = spy();

  beforeEach(() => {
    global.window.optimizely = {
      data: {
        state: {
          activeExperiments: [],
          variationIdsMap: {},
          variationNamesMap: {},
        },
      },
      push: pushSpy,
    };
  });

  afterEach(() => {
    pushSpy.resetHistory();
    global.window.optimizely = undefined;
  });

  describe('activate()', () => {
    it('should do nothing if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1);
      experiment.activate();

      expect(pushSpy).to.not.have.been.called();
    });

    it('should push to optimizely with "activate" and experiment Id', () => {
      const listener = spy()
      const experiment = new Optimizely({ listener, experimentId: 1 });
      experiment.activate();

      expect(pushSpy).to.have.been.called();
    });

    it('should dispatch activation', () => {
      const listener = spy();
      const experiment = new Optimizely(1);
      experiment.subscribe(listener);
      experiment.activate();

      expect(listener).to.have.callCount(1);
    });
  });

  describe('controlProps()', () => {
    it('should return control props', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1, {
        100: {
          foo: 'bar',
        },
      });

      expect(experiment.controlProps('100')).to.eql({ foo: 'bar' });
    });
  });

  describe('hasVariant()', () => {
    it('should be false if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1);

      expect(experiment.hasVariant([100])).to.equal(false);
    });

    it('should be false if no variants are active', () => {
      const experiment = new Optimizely(1);

      expect(experiment.hasVariant([100, 101])).to.equal(false);
    });

    it('should be false if experiment is not active', () => {
      global.window.optimizely.data.state.variationIdsMap[1] = [100];
      const experiment = new Optimizely(1);

      expect(experiment.hasVariant([100, 101])).to.equal(false);
    });

    it('should be true if a variant is active', () => {
      global.window.optimizely.data.state.activeExperiments = [1];
      global.window.optimizely.data.state.variationIdsMap[1] = [100];
      const experiment = new Optimizely(1);

      expect(experiment.hasVariant([100, 101, 102])).to.equal(true);
    });
  });

  describe('isActive()', () => {
    it('should be false if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1);

      expect(experiment.isActive([100])).to.equal(false);
    });

    it('should be false if the experiment is not active', () => {
      const experiment = new Optimizely(1);

      expect(experiment.isActive([100, 101])).to.equal(false);
    });

    it('should be true if the experiment is active', () => {
      global.window.optimizely.data.state.activeExperiments = [1];
      const experiment = new Optimizely(1);

      expect(experiment.isActive([100, 101, 102])).to.equal(true);
    });
  });

  describe('isControl()', () => {
    it('should be true if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1);

      expect(experiment.isControl([100])).to.equal(true);
    });

    it('should be false if a variant is active', () => {
      global.window.optimizely.data.state.activeExperiments = [1];
      global.window.optimizely.data.state.variationIdsMap[1] = [101];
      const experiment = new Optimizely(1);

      expect(experiment.isControl(100)).to.equal(false);
    });

    it('should be true if control variant is active', () => {
      global.window.optimizely.data.state.activeExperiments = [1];
      global.window.optimizely.data.state.variationIdsMap[1] = [100];
      const experiment = new Optimizely(1);

      expect(experiment.isControl(100)).to.equal(true);
    });

    it('should be true if no variant is active', () => {
      global.window.optimizely.data.state.variationIdsMap[1] = [];
      const experiment = new Optimizely(1);

      expect(experiment.isControl(100)).to.equal(true);
    });

    it('should be true if experiment is inactive', () => {
      global.window.optimizely.data.state.activeExperiments = [];
      const experiment = new Optimizely(1);

      expect(experiment.isControl(100)).to.equal(true);
    });
  });

  describe('pushEvent()', () => {
    it('should do nothing if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      Optimizely.pushEvent('foo');

      expect(pushSpy).to.have.callCount(0);
    });

    it('should push to optimizely with "trackEvent"', () => {
      Optimizely.pushEvent('foo');

      expect(pushSpy).to.have.been.calledWith(['trackEvent', 'foo']);
    });
  });

  describe('subscribe()', () => {
    beforeEach(() => {
      pushSpy.resetHistory();
    });

    it('should subscribe a listener', () => {
      const listener = spy();
      const experiment = new Optimizely(1);
      experiment.subscribe(listener);
      experiment.update({ group: [100] });

      expect(listener).to.have.been.calledWith({ group: [100] });
    });

    it('should unsubscribe a listener', () => {
      const listener = spy();
      const experiment = new Optimizely(1);
      const unsubscribe = experiment.subscribe(listener);
      unsubscribe();
      experiment.update({ group: [100] });

      expect(pushSpy).to.have.callCount(0);
    });

    it('should throw if listener is not a function', () => {
      const experiment = new Optimizely(1);

      expect(() => experiment.subscribe()).to.throw('Expected listener to be a function.');
    });

    it('should return an unsubscribe function', () => {
      const listener = spy();
      const experiment = new Optimizely(1);
      const unsubscribe = experiment.subscribe(listener);

      expect(unsubscribe).to.be.a('function');
    });
  });

  describe('update()', () => {
    it('should do nothing if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const listener = spy();
      const experiment = new Optimizely(1);
      experiment.subscribe(listener);
      experiment.update({ group: [100] });

      expect(listener).to.have.callCount(0);
    });

    it('should dispatch changes', () => {
      const listener = spy();
      const experiment = new Optimizely(1);
      experiment.subscribe(listener);
      experiment.update({ group: [100] });

      expect(listener).to.have.been.calledWith({ group: [100] });
      expect(global.window.optimizely.data.state.variationIdsMap[1]).to.eql([100]);
    });
  });

  describe('variantProps()', () => {
    it('should return null if window.optimizely does not exist', () => {
      global.window.optimizely = undefined;
      const experiment = new Optimizely(1);
      expect(experiment.variantProps()).to.equal(null);
    });

    it('should return variant props for current variant', () => {
      const experiment = new Optimizely(1, {
        100: {
          foo: 'bar',
        },
      });

      experiment.update({ group: [100] });

      expect(experiment.variantProps()).to.eql({ foo: 'bar' });
    });
  });
});
