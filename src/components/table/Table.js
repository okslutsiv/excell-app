import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  static classNames = "excel__table";

  constructor($root) {
    super($root, {
      name: "Table",
    });
  }
  toHTML() {
    return createTable(20);
  }
}
