export const getAllKeys = () => {
  return Object.keys(localStorage).filter((key) => key.includes("excel"));
};

const toListItem = (key) => {
  const table = JSON.parse(localStorage.getItem(key));
  return `<li class="db__record">
      <a href=/#excel/${table.id}><h3>
      ${table.tableTitle}
      </h3></a>
      <strong>${table.lastOpened}</strong>
    </li>`;
};
export const createDashboardList = () => {
  const keys = getAllKeys();
  if (!keys.length) {
    return `
     <div style="text-align: center;margin-top: 2rem;">
       You have no tables yet
     </div>
`;
  } else {
    return `
    <div class="db__table db__view">
        <div class="db__list-header">
            <span>Name</span>
            <span>Date</span>
        </div>
        <ul class="db__list">
            ${keys
              .map((key) => {
                return toListItem(key);
              })
              .join("")}
        </ul>
    </div>`;
  }
};
