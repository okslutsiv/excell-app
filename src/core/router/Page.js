export class Page {
  constructor(params) {
    this.params = params;
  }
  getRoot() {
    throw new Error(`Method 'getRoot'has to be implemeted in Page component`);
  }
  afterRender() {}
  destroy() {}
}
