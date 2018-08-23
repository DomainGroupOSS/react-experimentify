import get from 'lodash/get';
import has from 'lodash/has';
import { Experiment } from './models/experiment';

class ExperimentGlobals implements Experiment {
  constructor(path, controlProps) {
    this.path = path;

    if (controlProps) {
      this.controlProps = controlProps;
    }
  }

  activate = () => this.dispatch()

  controlProps = () => undefined

  dispatch = () => {
    if (this.isActive()) {
      this.listeners.forEach(listener => listener({}));
    }
  }

  hasVariant = () => this.isActive()

  isActive = () => has(global, this.path)

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

  variantProps = () => get(global, this.path) || null
}

export default ExperimentGlobals;
