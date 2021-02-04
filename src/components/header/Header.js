import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static classNames = "excel__header";
  constructor($root) {
    super($root, {
      name: "Header",
    });
  }

  toHTML() {
    return `<input type="text" value="New table" class="input" />
    <div>
      <button>
        <span class="material-icons"> exit_to_app </span>
      </button>
      <button>
        <span class="material-icons"> delete </span>
      </button>
    </div>`;
  }
}
