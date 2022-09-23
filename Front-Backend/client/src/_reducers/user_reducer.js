import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";
export default function (previousState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...previousState, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...previousState, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...previousState, userDate: action.payload };
    default:
      return previousState;
  }
}
