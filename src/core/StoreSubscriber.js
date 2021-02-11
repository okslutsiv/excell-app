import { isEqual } from "../utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }
  subscribeComponents(components) {
    this.prevState = this.store.getState();
    this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(state[key], this.prevState[key])) {
          components.forEach((comp) => {
            if (comp.isWatching(key)) {
              const changes = { [key]: state[key] };
              comp.$onStateChange(changes);
            }
          });
        }
      });
      this.prevState = state;
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
