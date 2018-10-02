import { VIEWSTATE_SET, VIEWSTATE_REMOVE } from '../constants/actionTypes';

export const setViewstate = (key, value) => ({
  type: VIEWSTATE_SET,
  payload: { key, value }
});

export const removeViewstate = (key) => ({
  type: VIEWSTATE_REMOVE,
  payload: { key }
});
