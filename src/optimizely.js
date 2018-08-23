/* eslint-disable class-methods-use-this, prefer-destructuring */
import { Experiment } from './models/experiment';

class Optimizely implements Experiment {
  constructor(experimentId, groupVariants) {
    this.experimentId = experimentId;
    this.groupVariants = groupVariants;
  }

  pushEvent(eventName) {
    if (typeof window !== 'undefined') {
      const optimizely = window.optimizely;

      if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
        optimizely.push(['trackEvent', eventName]);
      }
    }
  }

  experimentState() {
    if (
      typeof window !== 'undefined'
      && typeof window.optimizely !== 'undefined'
      && typeof window.optimizely.data !== 'undefined'
    ) {
      return window.optimizely.data.state;
    }

    return undefined;
  }

  activate = () => {
    const optimizely = window.optimizely;

    if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
      optimizely.push(['activate', this.experimentId]);
      this.dispatch();
    }
  }

  controlProps = (controlGroup) => {
    if (controlGroup) {
      return this.groupVariants[controlGroup];
    }

    return controlGroup;
  }

  dispatch = () => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment !== 'undefined') {
      this.listeners.forEach(listener => listener({
        group: experiment.variationIdsMap[this.experimentId],
      }));
    }
  }

  hasVariant = (variantIds) => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment === 'undefined') {
      return false;
    }

    if (!this.isActive()) {
      return false;
    }

    const variations = experiment.variationIdsMap[this.experimentId] || [];
    const ids = Array.isArray(variantIds) ? variantIds : [variantIds];
    return variations.some(variant => ids.includes(variant));
  }

  isActive = () => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment === 'undefined') {
      return false;
    }

    return experiment.activeExperiments.includes(this.experimentId);
  }

  isControl = (group) => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment === 'undefined') {
      return true;
    }

    if (!this.isActive()) {
      return true;
    }

    const variations = experiment.variationIdsMap[this.experimentId] || [];
    return variations.length === 0 || variations.some(variant => group === variant);
  }

  subscribe = (listener) => {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    let isSubscribed = true;

    this.listeners.push(listener);

    const unsubscribe = () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };

    return unsubscribe;
  }

  update = ({ group = [] }) => {
    const { variationIdsMap } = Optimizely.experimentState() || {};

    if (typeof variationIdsMap !== 'undefined') {
      variationIdsMap[this.experimentId] = Array.isArray(group) ? group : [group];
      this.dispatch();
    }
  }

  variantProps = () => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment === 'undefined') {
      return null;
    }

    const [activeVariant] = experiment.variationIdsMap[this.experimentId] || [];
    return this.groupVariants[activeVariant];
  }
}

export default Optimizely;
