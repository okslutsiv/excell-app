export const activeRoute = {
  path(path) {
    if (!path) {
      return window.location.hash.slice(1);
    }
  },
  param() {
    return this.path().split("/")[1];
  },
  pathWithoutParams() {
    return this.path().split("/")[0];
  },
  navigate(path) {
    window.location.hash = path;
  },
};
