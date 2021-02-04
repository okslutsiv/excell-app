import { capitalize } from "../utils";

const getMethodName = (eventName) => `on${capitalize(eventName)}`;

export class DomListener {
  constructor(root, listeners = []) {
    if (!root) throw new Error("No $root provided for DomListener");
    this.$root = root;
    this.listeners = listeners;
  }
  initDOMListeners() {
    this.listeners.map((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw Error(`Method ${method} is not implemented in ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
