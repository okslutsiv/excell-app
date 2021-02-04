import { $ } from "@core/dom";

export const shouldResize = (e) => !!e.target.dataset.resize;

export function handleResize(root, e) {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resisable"]');
  const { right, bottom, width, height } = $parent.getCoords();
  let columns;
  let newWidth;
  let newHeight;
  const { resize } = $resizer.data;

  if ($parent.data.col) {
    columns = root.findAll(`[data-col="${$parent.data.col}"]`);
  }

  document.onmousemove = (event) => {
    if (resize === "col") {
      $resizer.css({
        height: "100vh",
        opacity: 1,
      });
      newWidth = `${width + event.pageX - right}px`;
      $parent.css({ width: newWidth });
    } else if (resize === "row") {
      $resizer.css({
        width: "100vw",
        opacity: 1,
      });
      newHeight = `${height + event.pageY - bottom}px`;
      $parent.css({ height: newHeight });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (resize === "col") {
      columns.forEach((el) => {
        $(el).css({ width: newWidth });
      });
      $resizer.css({
        height: "100%",
        opacity: 0,
        width: "4px",
      });
    }
    if (resize === "row") {
      $resizer.css({
        height: "4px",
        opacity: 0,
        width: "100%",
      });
    }
  };
}
