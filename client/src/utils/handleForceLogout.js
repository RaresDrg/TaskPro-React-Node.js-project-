import { notifyWarning } from "./notify";
import { store } from "../redux/store";
import { forceLogout } from "../redux/auth/slice";
import { resetState } from "../redux/modals/slice";

export function handleForceLogout(errorMessage) {
  store.dispatch(forceLogout());
  store.dispatch(resetState());

  notifyWarning(`${errorMessage}. Please, log in again !`);
}
