import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { handleResize, shouldResize } from "./resizeHandler";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";

import {
  isCell,
  handleMouseSelection,
  moveSelectionOnKeydown,
} from "./selectHandler";

export class Table extends ExcelComponent {
  static classNames = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
    this.prepare();
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    const $startCell = this.$root.find(`[data-id="1:0"]`);
    this.selection.selectOne($startCell);
    this.$notify("table:selection", $startCell);

    this.$on("formula:text", (text) => {
      this.selection.$current.text(text);
    });
    this.$on("formula:done", () => this.selection.$current.focus());
  }
  toHTML() {
    return createTable(20);
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(this.$root, e);
    }
    if (isCell(e)) {
      handleMouseSelection(e, this);
    }
  }
  onKeydown(e) {
    moveSelectionOnKeydown(e, this);
  }
  onInput(event) {
    this.$notify("table:text", $(event.target).text());
  }
}
// 621 ms  Scripting
// 2086 ms  Rendering
// 9486 ms  Total

// 460 ms  Scripting
// 472 ms  Rendering
// 6865 ms  Total
