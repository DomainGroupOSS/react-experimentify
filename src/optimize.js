import once from 'lodash/once';
import pushToDataLayer from './helpers/push-to-data-layer';
import { Experiment } from './models/experiment';

class Optimize implements Experiment {
  listeners: Array<Function> = [];
  eventData: any;

  constructor(experimentName, controlProps) {
    this.experimentName = experimentName;

    if (controlProps) {
      this.controlProps = controlProps;
    }
  }

  activate = (onActivation) => {
    this.addEventListener();

    // Trigger an experiment execute is a async operation hence we need
    // to fire an event from experiment to trigger the rendering from Google Optimize.
    // This way we are ensuring that Optimize had time to execute the script in the exeriment.
    pushToDataLayer({ event: `${this.experimentName}.activate` });

    if (typeof onActivation === 'function') {
      onActivation();
    }
  }

  addEventListener = once(() => {
    if (window) {
      window.addEventListener(`${this.experimentName}.render`, this.triggerRenderingOfExperiment);
    }
  });

  triggerRenderingOfExperiment = (event) => {
    this.eventData = event.detail;
    this.dispatch();
  }

  controlProps = () => undefined

  dispatch = () => {
    if (this.isActive()) {
      this.listeners.forEach(listener => listener({}));
    }
  }

  hasVariant = () => this.isActive()

  isActive = () => !!this.eventData

  isControl = () => !this.isActive()

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

  update = () => this.dispatch()

  variantProps = () => this.eventData || null
}

export default Optimize;
