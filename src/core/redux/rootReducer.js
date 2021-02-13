import {
  COL_RESIZE,
  ROW_RESIZE,
  TEXT_EDIT,
  STYLES_EDIT,
  SET_SELECTION,
  TITLE_EDIT,
} from "./types";

export const initialState = {
  id: null,
  tableTitle: "New Table",
  colState: {},
  rowState: {},
  cellsData: {},
  cellsStyles: {},
  currentSelection: [],
};

export const rootReducer = (state, action) => {
  switch (action?.type) {
    case COL_RESIZE:
      return {
        ...state,
        colState: {
          ...state.colState,
          ...action.payload,
        },
      };
    case ROW_RESIZE:
      return {
        ...state,
        rowState: {
          ...state.rowState,
          ...action.payload,
        },
      };
    case TEXT_EDIT:
      return {
        ...state,
        cellsData: {
          ...state.cellsData,
          [action.payload.id]: action.payload.text,
        },
      };
    case STYLES_EDIT:
      return {
        ...state,
        cellsStyles: {
          ...state.cellsStyles,
          ...action.payload,
        },
      };
    case SET_SELECTION:
      return {
        ...state,
        currentSelection: [...action.payload],
      };
    case TITLE_EDIT:
      return {
        ...state,
        tableTitle: action.payload,
      };
    default:
      return state;
  }
};
