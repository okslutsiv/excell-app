const CODES = {
  A: 65,
  Z: 90,
};
const createRow = (num, content) => {
  const resizer = num ? '<div class="row-resize" data-resize="row"></div>' : "";
  return `
<div class="row" data-type='resisable'>
  <div class="row-info" >
  ${num}${resizer}</div>
  <div class="row-data">${content}</div>
</div>`;
};

const toColumn = (char, i) => {
  return `
  <div class="column" data-type='resisable' data-col=${i} >
  ${char}<div class="col-resize" data-resize="col" >
  </div></div>`;
};
const toChar = (_, i) => String.fromCharCode(i + CODES.A);

const createCell = (_, i) =>
  `<div contenteditable class="cell" data-col=${i}></div>`;

export const createTable = (rowsCount = 25) => {
  const colCount = CODES.Z - CODES.A + 1;

  const columns = Array(colCount).fill(null).map(toChar).map(toColumn).join("");

  const cells = Array(colCount).fill(null).map(createCell).join("");

  const rows = [];
  rows.push(createRow("", columns));
  for (let i = 1; i < rowsCount + 1; i++) {
    rows.push(createRow(i, cells));
  }

  return rows.join("");
};
