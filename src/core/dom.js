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
