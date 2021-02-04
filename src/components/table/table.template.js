const CODES = {
  A: 65,
  Z: 90,
};
const createRow = (num, content) => `
<div class="row">
  <div class="row-info">${num}</div>
  <div class="row-data">${content}</div>
</div>`;

const toColumn = (char) => {
  return `<div class="column">${char}</div>`;
};
const toChar = (_, i) => String.fromCharCode(i + CODES.A);

const createCell = () => `<div contenteditable class="cell"></div>`;

export const createTable = (rowsCount = 25) => {
  const colCount = CODES.Z - CODES.A + 1;

  const columns = Array(colCount).fill(null).map(toChar).map(toColumn).join("");

  const cells = Array(colCount).fill(createCell()).join("");

  const rows = [];
  rows.push(createRow("", columns));
  for (let i = 1; i < rowsCount + 1; i++) {
    rows.push(createRow(i, cells));
  }

  return rows.join("");
};
