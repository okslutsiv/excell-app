export class TableSelection {
  static className = "selected";
  constructor() {
    this.selection = [];
    this.$current = null;
  }
  addToSelection($element) {
    this.selection.push($element);
    $element.addClass(TableSelection.className);
  }
  selectOne($element) {
    this.clear();
    this.$current = $element;
    this.addToSelection($element);
    $element.focus();
  }
  clear() {
    this.selection.forEach(($s) => $s.removeClass(TableSelection.className));
    this.selection.length = 0;
  }
  selectGroup($elements = []) {
    this.clear();
    $elements.forEach(($element) => this.addToSelection($element));
  }
}
