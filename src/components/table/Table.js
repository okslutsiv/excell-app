import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { handleResize, shouldResize } from "./resizeHandler";
import { TableSelection } from "./TableSelection";
import { $ } from "@core/dom";
import { parse } from "@/utils";

import {
  isCell,
  handleMouseSelection,
  moveSelectionOnKeydown,
} from "./selectHandler";
import { editText } from "../../core/redux/actions";

export class Table extends ExcelComponent {
  static classNames = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input", "dblclick"],
      subscribes: ["cellsData", "cellsStyles"],
      ...options,
    });
    this.defaults = {
      cols: {
        minWidth: 40,
        standardWidth: 120,
      },
      rows: {
        minHeight: 12,
        standardHeight: 24,
        count: 25,
      },
    };
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
      this.selection.$current.attr("data-value", text).text(parse(text));
      this.$dispatch(
        editText({
          id: this.selection.$current.data.id,
          text: this.selection.$current.data.value,
        })
      );
    });
    this.$on("formula:done", () => {
      this.selection.$current.focus();
    });
    this.$on("toolbar:applyStyle", (style) => {
      this.selection.selection.forEach(($el) => $el.css(style));
    });
  }
  toHTML() {
    return createTable(this);
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(this, e);
    }
    if (isCell(e)) {
      handleMouseSelection(e, this);
    }
  }
  onKeydown(e) {
    moveSelectionOnKeydown(e, this);
  }
  onInput(event) {
    const $cell = $(event.target);
    this.$notify("table:text", $cell.text());
    this.$dispatch(editText({ id: $cell.data.id, text: $cell.text() }));
  }
  onDblclick(e) {
    if (shouldResize(e)) {
      handleResize(this, e);
    }
  }
  $onStateChange() {}
}
// 621 ms  Scripting
// 2086 ms  Rendering
// 9486 ms  Total

// 460 ms  Scripting
// 472 ms  Rendering
// 6865 ms  Total
