import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

const sandbox = sinon.createSandbox();

const useInView = sandbox.stub();
const trackMixpanelExperiment = sandbox.spy();

const { default: MixpanelExperiment } = proxyquire('../../src/mixpanel.js', {
  'react-intersection-observer': { useInView },
  './helpers/track-mixpanel-experiment': { default: trackMixpanelExperiment },
});

const props = {
  experimentName: 'test',
  showVariant: true,
  renderVariant: () => <div>variant</div>,
  renderControl: () => <div>control</div>,
};

describe('Mixpanel Experiment', () => {
  beforeEach(() => {
    sandbox.reset();
    useInView.returns({ ref: { current: null }, inView: true });
  });

  after(() => {
    sandbox.restore();
  });

  it('should render variant if showVariant true', () => {
    const wrapper = shallow(<MixpanelExperiment {...props} />);

    expect(wrapper.text()).to.equal('variant');
  });

  it('should render control if showVariant false', () => {
    const wrapper = shallow(<MixpanelExperiment {...props} showVariant={false} />);

    expect(wrapper.text()).to.equal('control');
  });

  it('should fire track experiment if in view', () => {
    // need to mount for useeffect to fire
    mount(<MixpanelExperiment {...props} />);

    expect(trackMixpanelExperiment).to.have.been.calledOnce();
  });

  it('should not fire track experiment if not in view', () => {
    useInView.returns({ ref: { current: null }, inView: false });

    // need to mount for useeffect to fire
    mount(<MixpanelExperiment {...props} />);

    expect(trackMixpanelExperiment).to.not.have.been.called();
  });
});
