export const createStore = (rootReducer, initialState) => {
  let state = rootReducer(initialState);
  const listeners = [];
  return {
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((l) => l(state));
    },
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners.filter((l) => l !== fn);
        },
      };
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
};
