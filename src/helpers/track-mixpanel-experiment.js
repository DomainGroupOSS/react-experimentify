import getMixpanel from './get-mixpanel';


const trackMixpanelExperiment = (experimentName, isVariant) => {
  const superPropertyKey = `experiment-${experimentName}`;
  try {
    const mixpanel = getMixpanel();
    const hasAlreadyFired = !!mixpanel.get_property(superPropertyKey);

    if (!hasAlreadyFired) {
      const value = isVariant ? 'Variant' : 'Control';

      // set the super property so that we only fire once per device
      mixpanel.register({ [superPropertyKey]: value });

      // the actual event logging which variant is delivered
      mixpanel.track('$experiment_started', {
        'Experiment name': experimentName,
        'Variant name': value,

      });
    }
  } catch (error) {
    // log to raygun if globally available
    if (typeof rg4js === 'function') {
      rg4js('send', { error, tags: ['mixpanel'], customData: `Error tracking mixpanel experiment ${experimentName}` });
    } else {
      console.error(`Error tracking mixpanel experiment ${experimentName}`);
    }
  }
};

export default trackMixpanelExperiment;
