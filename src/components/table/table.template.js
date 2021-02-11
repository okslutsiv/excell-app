import { objToString, parse } from "@/utils";

const CODES = {
  A: 65,
  Z: 90,
};

export const createTable = (instance) => {
  const { defaults, store } = instance;
  const rowsCount = defaults.rows.count;
  const state = store.getState();
  const defaultRowHeight = `${defaults.rows.standardHeight}px`;
  const defaultColWidth = `${defaults.cols.standardWidth}px`;
  const colCount = CODES.Z - CODES.A + 1;

  const getHeight = (i) => {
    return state.rowState[i] ? state.rowState[i] : defaultRowHeight;
  };
  const getWidth = (i) => {
    return state.colState[i] ? state.colState[i] : defaultColWidth;
  };

  const getTableHead = () => {
    const resizer = `<div class="col-resize" data-resize="col" ></div>`;
    const toChar = (_, i) => String.fromCharCode(i + CODES.A);
    const toColumn = (char, i) => {
      return `
  <div class="column" data-type='resisable' data-col=${i} 
     style="width:${getWidth(i)}">
     ${char}
     ${resizer}
  </div>`;
    };
    return Array(colCount).fill(null).map(toChar).map(toColumn).join("");
  };

  const getRowCells = (row) => {
    const createCell = (row) => (_, i) => {
      const id = `${row}:${i}`;
      const data = state.cellsData[id];
      const styles = state.cellsStyles[id];
      const stylesString = styles ? objToString(styles) : "";
      return `
        <div contenteditable class="cell" 
            data-col=${i} 
            data-id="${id}" 
            data-value="${data || ""}"
            style="width:${getWidth(i)}; ${stylesString}">
            ${parse(data) || ""}
        </div>

       
  `;
    };

    return Array(colCount).fill(null).map(createCell(row)).join("");
  };

  const createRow = (rowNum, rowCells) => {
    const resizer = rowNum
      ? '<div class="row-resize" data-resize="row"></div>'
      : "";

    return `
<div class="row" data-type='resisable' data-row=${rowNum} 
     style="height: ${getHeight(rowNum)}">
  <div class="row-info" >
    ${rowNum}${resizer}
  </div>
  <div class="row-data">${rowCells}</div>
</div>`;
  };

  const rows = [];
  rows.push(createRow("", getTableHead()));

  for (let row = 1; row < rowsCount + 1; row++) {
    rows.push(createRow(row, getRowCells(row)));
  }

  return rows.join("");
};
