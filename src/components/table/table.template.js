const CODES = {
  A: 65,
  Z: 90,
};

const toColumn = (char, i) => {
  return `
  <div class="column" data-type='resisable' data-col=${i} >
  ${char}<div class="col-resize" data-resize="col" >
  </div></div>`;
};
const toChar = (_, i) => String.fromCharCode(i + CODES.A);

const createCell = (row) => (_, i) => `
  <div contenteditable class="cell" data-col=${i} data-id="${row}:${i}"></div>
  `;

const createRow = (rowNum, rowCells) => {
  const resizer = rowNum
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";

  return `
<div class="row" data-type='resisable'>
  <div class="row-info" >
    ${rowNum}${resizer}
  </div>
  <div class="row-data">${rowCells}</div>
</div>`;
};

export const createTable = (rowsCount = 25) => {
  const colCount = CODES.Z - CODES.A + 1;

  const getColumnsNames = () =>
    Array(colCount).fill(null).map(toChar).map(toColumn).join("");

  const getRowCells = (row) =>
    Array(colCount).fill(null).map(createCell(row)).join("");

  const rows = [];
  rows.push(createRow("", getColumnsNames()));

  for (let row = 1; row < rowsCount + 1; row++) {
    rows.push(createRow(row, getRowCells(row)));
  }

  return rows.join("");
};
