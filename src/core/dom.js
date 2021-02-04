class Dom {
  constructor(selector, listeners = []) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    this.listeners = listeners;
  }
  html(html) {
    if (typeof html === "string") this.$el.innerHTML = html;
    return this.$el.outerHTML.trim();
  }
  clear() {
    this.innerHTML = "";
    return this;
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  get data() {
    return this.$el.dataset;
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  append(node) {
    const nativeNode = node instanceof Dom ? node.$el : node;

    if (Element.prototype.append) {
      this.$el.append(nativeNode);
    } else {
      this.$el.appendChild(nativeNode);
    }
    return this;
  }
}

export const $ = (selector) => new Dom(selector);

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
