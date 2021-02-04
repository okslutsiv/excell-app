import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static classNames = "excel__formula";
  constructor($root) {
    super($root, {
      name: "Formula",
      listeners: ["input", "click"],
    });
  }
  toHTML() {
    return `
      <div class="info">fs</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }
  onInput(event) {
    console.dir(event.target.textContent.trim());
    // this.$root && console.log(this.$root);
  }
  onClick(event) {
    console.log(`Formula: onIClick, ${event.target} `);
  }
}
