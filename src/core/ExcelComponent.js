import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || "";
    this.observer = options.observer;
    this.subscribes = options.subscribes || [];
    this.store = options.store;
    this.unsubscribers = [];
    this.$notify = this.$notify.bind(this);
    this.$on = this.$on.bind(this);
    this.$dispatch = this.$dispatch.bind(this);
    this.$onStateChange = this.$onStateChange.bind(this);
    this.prepare();
  }
  prepare() {}

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
  $dispatch(action) {
    this.store.dispatch(action);
  }
  isWatching(key) {
    return this.subscribes.includes(key);
  }
  $onStateChange() {}
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
