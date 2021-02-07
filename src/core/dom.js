class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html.trim();
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  text(text) {
    if (typeof text === "string") {
      this.$el.innerText = text.trim();
      return this;
    }
    if (typeof text === "function") {
      this.$el.innerText = text().trim();
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.innerText.trim();
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
  get id() {
    const splited = this.$el.dataset.id.split(":");
    return { row: splited[0], col: splited[1] };
  }
  // styles
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
    return this;
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
  focus() {
    this.$el.focus();
    return this;
  }
  // find
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
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
