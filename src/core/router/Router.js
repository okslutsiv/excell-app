import { $ } from "@core/dom";
import { activeRoute } from "./activeRoute";

export class Router {
  constructor(selector, routes = {}) {
    if (!selector) {
      throw new Error("You have to provide selector for the Router");
    }
    this.$root = $(selector);
    this.routes = routes;
    this.page = null;
    this.onHashChange = this.onHashChange.bind(this);
    this.init();
  }
  init() {
    window.addEventListener("hashchange", this.onHashChange);
    this.onHashChange();
  }
  onHashChange() {
    if (this.page) {
      this.page.destroy();
    }
    const path = activeRoute.pathWithoutParams();
    if (!path || !Object.keys(this.routes).includes(path)) {
      throw new Error("Invalid path!");
    }
    const Page = this.routes[path];
    this.page = new Page();
    this.$root.clear().append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener("hashchange", this.onHashChange);
  }
}
