import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';

const sandbox = sinon.createSandbox();
const mixpanel = {
  get_property: sandbox.stub(),
  register: sandbox.spy(),
  track: sandbox.spy(),
};
const { default: trackMixpanelExperiment } = proxyquire('../../../src/helpers/track-mixpanel-experiment', {
  './get-mixpanel': { default: () => mixpanel },
});

describe('trackMixpanel helper', () => {
  beforeEach(() => {
    sandbox.reset();
    mixpanel.get_property.returns(false);
  });

  it('should track with correct data when showing variant', () => {
    trackMixpanelExperiment('test', true);

    expect(mixpanel.register).to.have.been.calledOnceWith({
      'experiment-test': 'Variant',
    });

    expect(mixpanel.track).to.have.been.calledOnceWith('$experiment_started', {
      'Experiment name': 'test',
      'Variant name': 'Variant',
    });
  });

  it('should track with correct data when showing control', () => {
    trackMixpanelExperiment('test', false);

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

    trackMixpanelExperiment('test', true);

    expect(mixpanel.register).to.not.have.been.called();

    expect(mixpanel.track).to.not.have.been.called();
  });
});
