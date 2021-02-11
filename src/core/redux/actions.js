import {
  COL_RESIZE,
  ROW_RESIZE,
  SET_SELECTION,
  STYLES_EDIT,
  TEXT_EDIT,
  TITLE_EDIT,
} from "./types";

export const resizeRow = (data) => ({
  type: ROW_RESIZE,
  payload: data,
});
export const resizeCol = (data) => {
  return {
    type: COL_RESIZE,
    payload: data,
  };
};
export const editText = (data) => ({
  type: TEXT_EDIT,
  payload: data,
});

export const editStyles = (data) => ({
  type: STYLES_EDIT,
  payload: data,
});

export const setCurrentSelection = (data) => ({
  type: SET_SELECTION,
  payload: data,
});

export const editTableTitle = (data) => ({
  type: TITLE_EDIT,
  payload: data,
});
