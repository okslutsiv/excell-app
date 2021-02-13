import { Page } from "@core/router/Page";
import { Excel } from "@/components/excel/Excel";
import { Formula } from "@/components/formula/Formula";
import { Header } from "@/components/header/Header";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { rootReducer, initialState } from "@core/redux/rootReducer";
import { createStore } from "@core/redux/createStore";
import { storage, debounce } from "@/utils";
import { activeRoute } from "../activeRoute";

export class ExcelPage extends Page {
  constructor(params) {
    super(params);
    this.excel = null;
    this.storageKey = null;
  }
  getRoot() {
    const param = activeRoute.param();
    this.storageKey = `excel-${param}`;

    const state = {
      ...initialState,
      ...storage(this.storageKey),
      currentSelection: ["1:0"],
      id: param,
      lastOpened: `${new Date().toLocaleString()} `,
    };

    const store = createStore(rootReducer, state);

    const stateListener = debounce((state) => {
      storage(this.storageKey, state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel("#root", {
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
