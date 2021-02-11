export const createToolbar = (instance) => {
  const { buttons } = instance.getState();
  const toBtn = (button) => {
    return `
        <button ${button.active ? 'class="active"' : ""}
         data-value=${JSON.stringify(button.value)} data-id=${button.id}>
          <span class="material-icons "> ${button.iconText}</span>
        </button>
      `;
  };
  return buttons.map((b) => toBtn(b)).join("");
};
