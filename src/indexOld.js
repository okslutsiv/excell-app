import "@/styles/index.scss";
import { Excel } from "@/components/excel/Excel";
import { Formula } from "@/components/formula/Formula";
import { Header } from "@/components/header/Header";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { rootReducer, initialState } from "./core/redux/rootReducer";
import { createStore } from "./core/redux/createStore";
import { storage, debounce } from "./utils";

const state = {
  ...initialState,
  ...storage("excel-app"),
  currentSelection: ["1:0"],
};

const store = createStore(rootReducer, state);

const stateListener = debounce((state) => {
  storage("excel-app", state);
  console.log("Application state: ", state);
}, 500);

store.subscribe(stateListener);

const excel = new Excel("#root", {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();

console.log("Excel 🚀 ");
