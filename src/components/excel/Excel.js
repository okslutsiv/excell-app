import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }
  getRoot() {
    const $root = $.create("div", "excel");
    this.components = this.components.map((Component) => {
      const classes = Component.classNames;
      const $el = $.create("div", classes);
      const component = new Component($el);
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
