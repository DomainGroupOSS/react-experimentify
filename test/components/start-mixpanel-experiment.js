import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';

const sandbox = sinon.createSandbox();
const mixpanel = {
  get_property: sandbox.stub(),
  register: sandbox.spy(),
  track: sandbox.spy(),
};
const { default: startMixpanelExperiment } = proxyquire('../../src/start-mixpanel-experiment', {
  './helpers/get-mixpanel': { default: () => mixpanel },
});

const args = { experimentName: 'test', isVariant: true };


describe.only('trackMixpanel helper', () => {
  beforeEach(() => {
    sandbox.reset();
    mixpanel.get_property.returns(false);
  });

  it('should track with correct data when showing variant', () => {
    startMixpanelExperiment(args);

    expect(mixpanel.register).to.have.been.calledOnceWith({
      'experiment-test': 'Variant',
    });

    expect(mixpanel.track).to.have.been.calledOnceWith('$experiment_started', {
      'Experiment name': 'test',
      'Variant name': 'Variant',
    });
  });

  it('should track with correct data when showing control', () => {
    startMixpanelExperiment({ ...args, isVariant: false });

    expect(mixpanel.register).to.have.been.calledOnceWith({
      'experiment-test': 'Control',
    });

    expect(mixpanel.track).to.have.been.calledOnceWith('$experiment_started', {
      'Experiment name': 'test',
      'Variant name': 'Control',
    });
  });

  it('should not track when already fired', () => {
    mixpanel.get_property.returns('Variant');

    startMixpanelExperiment(args);

    expect(mixpanel.register).to.not.have.been.called();

    expect(mixpanel.track).to.not.have.been.called();
  });


  it('should fire onError if experiment start throws', () => {
    const error = new Error('oops');
    mixpanel.get_property.throws(error);
    const onError = sandbox.spy();

    startMixpanelExperiment({ ...args, onError });

    expect(onError).to.have.been.calledOnceWith(error, 'Error starting mixpanel experiment test');
  });

  it('should fire onSuccess if starting experiment is successful', () => {
    const onSuccess = sandbox.spy();

    startMixpanelExperiment({ ...args, onSuccess });

    expect(onSuccess).to.have.been.calledOnce();
  });
});
