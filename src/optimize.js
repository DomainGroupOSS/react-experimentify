import once from 'lodash/once';
import Debug from 'debug';
import pushToDataLayer from './helpers/push-to-data-layer';
import { Experiment } from './models/experiment';

const debug = Debug('react-experimentify');

class Optimize implements Experiment {
  listeners: Array<Function> = [];
  eventData: any;

  constructor(experimentName, controlProps) {
    this.experimentName = experimentName;

    if (controlProps) {
      this.controlProps = controlProps;
    }
    debug(`Created ${experimentName}.`);
  }

  activate = (onActivation) => {
    debug(`Activating ${this.experimentName}.`);
    debug(`${this.experimentName} isActive=${this.isActive()} (should be false unless a variant fires in near future)`);
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
      debug(`Listening for "${this.experimentName}.render".`);
      window.addEventListener(`${this.experimentName}.render`, this.triggerRenderingOfExperiment);
    }
  });

  triggerRenderingOfExperiment = (event) => {
    debug(`Received .render event for variant from Optimize for ${this.experimentName}.`, event);
    this.eventData = event.detail;
    debug(`${this.experimentName} isActive=${this.isActive()} (must be true for Treatment to render)`);
    this.dispatch();
  }

  controlProps = () => undefined

  dispatch = () => {
    if (this.isActive()) {
      debug(`Dispatching subscribers for ${this.experimentName}.`);
      this.listeners.forEach(listener => listener({}));
    } else {
      debug(`NOT Dispatching subscribers for ${this.experimentName} because experiment is not active.`);
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
