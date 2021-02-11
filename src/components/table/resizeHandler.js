import { $ } from "@core/dom";
import { resizeCol, resizeRow } from "@core/redux/actions";

export const shouldResize = (e) => !!e.target.dataset.resize;

export function handleResize(instance, e) {
  const { $root, $dispatch, defaults } = instance;
  const minColWidth = defaults.cols.minWidth;
  const minRowHeight = defaults.rows.minHeight;
  const defaultRowHeight = defaults.rows.standardHeight;
  const defaultColWidth = defaults.cols.standardWidth;

  const $resizer = $(e.target);
  const { resize } = $resizer.data;

  const $parent = $resizer.closest('[data-type="resisable"]');
  const { right, bottom, width, height } = $parent.getCoords();

  const colNum = $parent.data.col;
  const columnCells = $root.findAll(`[data-col="${colNum}"]`);
  const rowNum = $parent.data.row;

  let newWidth;
  let newHeight;

  if (e.type === "dblclick") {
    if (resize === "col") {
      newWidth = `${defaultColWidth}px`;
      $parent.css({ width: newWidth });
      columnCells.forEach((cell) => {
        $(cell).css({ width: newWidth });
      });
      $dispatch(resizeCol({ [colNum]: newWidth }));
    }
    if (resize === "row") {
      newHeight = `${defaultRowHeight}px`;
      $parent.css({ height: newHeight, fontSize: "24px" });
      $dispatch(resizeRow({ [rowNum]: newHeight }));
    }
  } else {
    document.onmousemove = (event) => {
      if (resize === "col") {
        $resizer.css({
          height: "100vh",
          opacity: 1,
        });
        newWidth =
          width + event.pageX - right > minColWidth
            ? `${width + event.pageX - right}px`
            : `${minColWidth}px`;
        $parent.css({ width: newWidth });
      } else if (resize === "row") {
        $resizer.css({
          width: "100vw",
          opacity: 1,
        });
        newHeight =
          height + event.pageY - bottom > minRowHeight
            ? `${height + event.pageY - bottom}px`
            : `${minRowHeight}px`;
        $parent.css({ height: newHeight });
      }
    };
  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (resize === "col") {
      columnCells.forEach((cell) => {
        $(cell).css({ width: newWidth });
      });
      $dispatch(resizeCol({ [colNum]: newWidth }));
      $resizer.css({
        height: "100%",
        opacity: 0,
        width: "4px",
      });
    }
    if (resize === "row") {
      $dispatch(resizeRow({ [rowNum]: newHeight }));
      $resizer.css({
        height: "4px",
        opacity: 0,
        width: "100%",
      });
    }
  };
}
