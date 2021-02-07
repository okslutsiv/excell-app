import { $ } from "@core/dom";
import { Observer } from "@core/Observer";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();
  }
  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = {
      observer: this.observer,
    };
    this.components = this.components.map((Component) => {
      const classes = Component.classNames;
      const $el = $.create("div", classes);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((c) => c.init());
  }
  destroy() {
    this.components.forEach((c) => c.destroy());
  }
}
