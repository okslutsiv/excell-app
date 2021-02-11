import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "@core/dom";
import { editTableTitle } from "@core/redux/actions";

export class Header extends ExcelComponent {
  static classNames = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],

      ...options,
    });
    this.defaults = { title: "New Table" };
  }
  prepare() {}
  toHTML() {
    const state = this.store.getState();
    const { tableTitle } = state;
    this.title = tableTitle || this.defaults.title;

    return `<input type="text" value="${this.title}" class="input" />
    <div>
      <button>
        <span class="material-icons"> exit_to_app </span>
      </button>
      <button>
        <span class="material-icons"> delete </span>
      </button>
    </div>`;
  }
  onInput(event) {
    const text = $(event.target).text();
    this.$dispatch(editTableTitle(text));
  }
}
