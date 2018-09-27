import { List, fromJS } from "immutable";
import { VIEWSTATE_SET_DATA } from "../constants/actionTypes";

export default function viewstate(state = fromJS({}), action) {
  switch (action.type) {
    case VIEWSTATE_SET_DATA:
      const { key, value } = action.payload;
      return key ? state.set(key, value) : state.merge(value);
    default:
      return state;
  }
}
