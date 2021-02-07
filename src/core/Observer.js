export class Observer {
  constructor() {
    this.listeners = {};
  }
  notify(event, ...args) {
    this.listeners[event].forEach((cb) => cb(...args));
  }
  subscribe(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
    return () => this.listenrs[event].filter((fn) => fn !== cb);
  }
}
