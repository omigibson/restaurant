import Immutable from "immutable";
import { VIEWSTATE_SET_DATA } from "../constants/actionTypes";

export default function viewstate(state = Immutable.fromJS({}), action) {
  switch (action.type) {
    case VIEWSTATE_SET_DATA:
      return state.merge(action.payload.selectedGuests);
    default:
      return state;
  }
}
