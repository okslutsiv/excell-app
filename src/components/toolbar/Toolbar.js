import { ExcelComponent } from "../../core/ExcelComponent";

export class Toolbar extends ExcelComponent {
  static classNames = "excel__toolbar";

  constructor($root) {
    super($root, {
      name: "Toolbar",
    });
  }
  toHTML() {
    return `          
    <button>
    <span class="material-icons"> format_align_left </span>
  </button>
  <button>
    <span class="material-icons"> format_align_center </span>
  </button>
  <button>
    <span class="material-icons"> format_align_right </span>
  </button>
  <button>
    <span class="material-icons"> format_bold </span>
  </button>
  <button>
    <span class="material-icons"> format_italic </span>
  </button>
  <button>
    <span class="material-icons"> format_underlined </span>
  </button>
`;
  }
}
