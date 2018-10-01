import { fromJS } from "immutable";
import { VIEWSTATE_SET_DATA, SEND_EMAIL_SUCCESS } from "../constants/actionTypes";

export default function viewstate(state = fromJS({}), action) {
  switch (action.type) {
    case VIEWSTATE_SET_DATA:
      const { key, value } = action.payload;
      return key ? state.set(key, value) : state.merge(value);
    case SEND_EMAIL_SUCCESS:
        return state.merge(action.payload);
    default:
      return state;
  }
}
