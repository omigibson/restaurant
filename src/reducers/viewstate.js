import { Map } from "immutable";
import { VIEWSTATE_SET, VIEWSTATE_REMOVE } from "../constants/actionTypes";

const initalState = Map();

export default function viewstate(state = initalState, action) {
  switch (action.type) {
    case VIEWSTATE_SET:
      const { key, value } = action.payload;
      return key ? state.set(key, value) : state.merge(value);
    case VIEWSTATE_REMOVE:
      return state.delete(action.payload.key);
    default:
      return state;
  }
}
