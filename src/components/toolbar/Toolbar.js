import { StatefulComponent } from "../../core/StatefulComponent";
import { createToolbar } from "./toolbar.template";
import { $ } from "@core/dom";
import { buttons as initialButtons } from "./buttons";
import { editStyles } from "../../core/redux/actions";

export class Toolbar extends StatefulComponent {
  static classNames = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribes: ["currentSelection"],

      ...options,
    });
    this.defaults = {
      style: {
        textAlign: "left",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
    };
  }
  prepare() {
    this.initState({ buttons: [...initialButtons] });
  }
  toHTML() {
    return createToolbar(this);
  }
  toStyles() {
    const { buttons } = this.getState();
    const style = buttons.reduce((obj, btn) => {
      if (btn.active) {
        const key = Object.keys(btn.value)[0];
        obj[key] = btn.value[key];
      }
      return obj;
    }, {});
    return style;
  }
  getInitialState() {
    const { cellsStyles } = this.store.getState();
    const firstCellStyles = cellsStyles["1:0"];

    const buttons = JSON.parse(JSON.stringify(initialButtons)).map((button) => {
      const [style, value] = Object.entries(button.value)[0];
      button.active = firstCellStyles[style] === value ? true : false;
      return button;
    });
    this.setState({ buttons });
    this.render();
  }
  render() {
    this.$root.html(this.toHTML());
  }
  getStylesFromSelection() {
    const { currentSelection, cellsStyles } = this.store.getState();
    const cellId = currentSelection[currentSelection.length - 1];
    const appliedStyles = cellsStyles[cellId];
    return appliedStyles;
  }
  onClick(e) {
    const { buttons } = this.getState();

    const $target = $(e.target).closest("button");
    if (!$target.$el) return;

    const clicked = buttons.find((b) => b.id === $target.data.id);
    clicked.active = !clicked.active;
    const defaultStyles = this.defaults.style;
    const property = Object.keys(clicked.value)[0];

    const style = clicked.active
      ? clicked.value
      : { [property]: defaultStyles[property] };
    this.$notify("toolbar:applyStyle", style);
    if (clicked.group === "format_align") {
      const rest = buttons.filter(
        (btn) => btn.group === "format_align" && btn.id !== $target.data.id
      );
      rest.forEach((r) => (r.active = false));
    }

    this.setState({ buttons });
    this.render();

    const { currentSelection } = this.store.getState();
    const styles = currentSelection.reduce((obj, id) => {
      obj[id] = this.toStyles(buttons);
      return obj;
    }, {});
    this.$dispatch(editStyles(styles));
  }
  $onStateChange(data) {
    if (Object.keys(data).includes("currentSelection")) {
      const appliedStyles = this.getStylesFromSelection();
      if (!appliedStyles) {
        this.setState({ buttons: [...initialButtons] });
        this.render();
        return;
      }
      const { buttons } = this.getState();
      buttons.forEach((button) => {
        const [style, value] = Object.entries(button.value)[0];
        button.active = appliedStyles[style] === value ? true : false;
      });
      this.setState({ buttons });
      this.render();
    }
  }
}
