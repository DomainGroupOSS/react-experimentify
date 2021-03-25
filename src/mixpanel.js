import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import trackMixpanelExperiment from './helpers/track-mixpanel-experiment';


/**
 * @description
 * This component can be used to conditionally render a component, and will
 * fire the mixpanel event signifying that an experiment has been started.
 *
 * It is designed to only fire as late as possible, i.e. when either the variant,
 * or the control (empty div) is in view.
 */
const MixpanelExperiment = ({
  experimentName,
  showVariant,
  renderVariant,
  renderControl,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      trackMixpanelExperiment(experimentName, showVariant);
    }
  }, [inView, experimentName, showVariant]);

  return <div ref={ref}>{showVariant ? renderVariant() : renderControl()}</div>;
};

MixpanelExperiment.propTypes = {
  experimentName: PropTypes.string.isRequired,
  showVariant: PropTypes.bool,
  renderVariant: PropTypes.func.isRequired,
  renderControl: PropTypes.func,
};

MixpanelExperiment.defaultProps = {
  showVariant: false,
  renderControl: () => null,
};

export default MixpanelExperiment;
