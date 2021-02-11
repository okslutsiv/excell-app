import { ExcelComponent } from "./ExcelComponent";

export class StatefulComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }
  initState(initialState) {
    this.state = { ...initialState };
  }
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
  }
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}
