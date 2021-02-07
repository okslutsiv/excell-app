import { $ } from "@core/dom";

export const isCell = (e) => !!$(e.target).data.id;

export const handleMouseSelection = (e, instance) => {
  const $target = $(e.target);
  const { $root, selection, $notify } = instance;
  if (!e.shiftKey) {
    selection.selectOne($target);
    $notify("table:selection", $target);
  } else if (e.shiftKey) {
    const { $current } = selection;

    const range = (start, end) => {
      if (start > end) [start, end] = [end, start];
      return new Array(end - start + 1).fill(null).map((_, i) => start + i);
    };
    const cols = range(+$current.id.col, +$target.id.col);
    const rows = range(+$current.id.row, +$target.id.row);

    const rangeIds = rows.reduce((acc, row) => {
      cols.forEach((col) => acc.push(`${row}:${col}`));
      return acc;
    }, []);
    const $elements = rangeIds.map((id) => $root.find(`[data-id="${id}"]`));
    selection.selectGroup($elements);
  }
};

export const moveSelectionOnKeydown = (e, instance) => {
  const { selection, $root, $notify } = instance;
  const allowedKeys = [
    "Enter",
    "Tab",
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
  ];
  if (allowedKeys.includes(e.key) && !e.shiftKey) {
    e.preventDefault();
    const {
      $current: { id },
    } = selection;
    const { key } = e;
    const $next = $root.find(getNextCell(key, id));
    selection.selectOne($next);
    $notify("table:selection", $next);

    function getNextCell(key, id) {
      let { row, col } = id;
      row = Number(row);
      col = Number(col);

      switch (key) {
        case "Enter":
        case "ArrowDown":
          row++;
          break;
        case "Tab":
        case "ArrowRight":
          col++;
          break;
        case "ArrowUp":
          row === 1 ? 1 : row--;
          break;
        case "ArrowLeft":
          col === 0 ? 0 : col--;
          break;
      }
      return `[data-id="${row}:${col}"]`;
    }
  }
};
