import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "@core/dom";
import { editTableTitle } from "@core/redux/actions";
import { activeRoute } from "../../core/router/activeRoute";

export class Header extends ExcelComponent {
  static classNames = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],

      ...options,
    });
    this.defaults = { title: "New Table" };
    this.state = null;
  }
  prepare() {}
  toHTML() {
    this.state = this.store.getState();
    const { tableTitle } = this.state;
    this.title = tableTitle || this.defaults.title;

    return `<input type="text" value="${this.title}" class="input" />
    <div>
      <button data-type='exit'>
        <span class="material-icons"> exit_to_app </span>
      </button>
      <button data-type='delete'>
        <span class="material-icons"> delete </span>
      </button>
    </div>`;
  }
  onInput(event) {
    const text = $(event.target).text();
    this.$dispatch(editTableTitle(text));
  }
  onClick(event) {
    const $btn = $(event.target).closest("button");
    if ($btn.$el) {
      if ($btn.data.type === "delete") {
        const decision = confirm(
          "You are going to delete the table sheet. Are you sure?"
        );
        if (decision) {
          const { id } = this.state;
          localStorage.removeItem(`excel-${id}`);
          activeRoute.navigate("#dashboard");
        }
      } else if ($btn.data.type === "exit") {
        activeRoute.navigate("#dashboard");
      }
    }
  }
}
