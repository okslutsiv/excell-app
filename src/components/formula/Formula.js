import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {
  static classNames = "excel__formula";
  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }
  init() {
    super.init();
    const $formula = this.$root.find("#input");

    this.$on("table:selection", ($cell) => {
      $formula.text($cell.text());
    });
    this.$on("table:text", (text) => {
      $formula.text(text);
    });
  }
  toHTML() {
    return `
      <div class="info">fs</div>
      <div id="input" class="input" contenteditable="true" spellcheck="false">
      </div>
    `;
  }
  onInput(event) {
    this.$notify("formula:text", $(event.target).text());
  }
  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$notify("formula:done");
    }
  }
}
