import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";
import { handleResize, shouldResize } from "./resizeHandler";

export class Table extends ExcelComponent {
  static classNames = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }
  toHTML() {
    return createTable(20);
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(this.$root, e);
    }
  }
}
// 621 ms  Scripting
// 2086 ms  Rendering
// 9486 ms  Total

// 460 ms  Scripting
// 472 ms  Rendering
// 6865 ms  Total
