import { $ } from "@core/dom";
import { Observer } from "@core/Observer";
import { StatefulComponent } from "../../core/StatefulComponent";
import { StoreSubscriber } from "../../core/StoreSubscriber";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.observer = new Observer();
    this.storeSubscriber = new StoreSubscriber(this.store);
  }
  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };
    this.components = this.components.map((Component) => {
      const classes = Component.classNames;
      const $el = $.create("div", classes);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      if (component instanceof StatefulComponent && component.getInitialState) {
        component.getInitialState();
      }
      return component;
    });
    return $root;
  }
  init() {
    this.storeSubscriber.subscribeComponents(this.components);
    this.components.forEach((c) => c.init());
  }
  destroy() {
    this.storeSubscriber.unsubscribeFromStore();
    this.components.forEach((c) => c.destroy());
  }
}
