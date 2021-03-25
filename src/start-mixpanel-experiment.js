import getMixpanel from './helpers/get-mixpanel';


const startMixpanelExperiment = ({
  experimentName, isVariant, onError = () => {}, onSuccess = () => {},
}) => {
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

      onSuccess();
    }
  } catch (error) {
    onError(error, `Error starting mixpanel experiment ${experimentName}`);
  }
};

export default startMixpanelExperiment;
