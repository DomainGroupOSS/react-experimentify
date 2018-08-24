/* eslint-disable prefer-destructuring */
import { Experiment } from './models/experiment';

export type OptimizelyState = {
  activeExperiments: Array<string>;
  variationMap: { [string]: string };
  variationIdsMap: { [string]: Array<string> };
} | void;

type PropMap = {
  [string]: any;
};

class Optimizely<T: PropMap> implements Experiment {
  experimentId: string;
  groupVariants: T;
  listeners: Array<Function> = [];

  static pushEvent(eventName: string) {
    if (typeof window !== 'undefined') {
      const optimizely = window.optimizely;

      if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
        optimizely.push(['trackEvent', eventName]);
      }
    }
  }

  static experimentState(): OptimizelyState {
    if (
      typeof window !== 'undefined'
      && typeof window.optimizely !== 'undefined'
      && typeof window.optimizely.data !== 'undefined'
    ) {
      return window.optimizely.data.state;
    }

    return undefined;
  }

  constructor(experimentId: string, groupVariants: T) {
    this.experimentId = experimentId;
    this.groupVariants = groupVariants;
  }

  activate = () => {
    const optimizely = window.optimizely;

    if (typeof optimizely !== 'undefined' && typeof optimizely.push === 'function') {
      optimizely.push(['activate', this.experimentId]);
      this.dispatch();
    }
  }

  controlProps = (controlGroup: ?string) => {
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

  hasVariant = (variantIds: Array<string> = []) => {
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

  isControl = (group: ?string) => {
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

  subscribe = (listener: Function) => {
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

  update = ({ group = [] }: { group: Array<string> }) => {
    const { variationIdsMap } = Optimizely.experimentState() || {};

    if (typeof variationIdsMap !== 'undefined') {
      variationIdsMap[this.experimentId] = Array.isArray(group) ? group : [group];
      this.dispatch();
    }
  }

  variantProps = (): mixed => {
    const experiment = Optimizely.experimentState();

    if (typeof experiment === 'undefined') {
      return null;
    }

    const [activeVariant] = experiment.variationIdsMap[this.experimentId] || [];
    return this.groupVariants[activeVariant];
  }
}

export default Optimizely;
