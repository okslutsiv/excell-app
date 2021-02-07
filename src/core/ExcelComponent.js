import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.observer = options.observer;
    this.unsubscribers = [];
    this.$notify = this.$notify.bind(this);
    this.$on = this.$on.bind(this);
  }
  toHTML() {
    return "";
  }
  init() {
    this.initDOMListeners();
  }
  $notify(event, ...args) {
    this.observer.notify(event, ...args);
  }
  $on(event, cb) {
    this.observer.subscribe(event, cb);
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
