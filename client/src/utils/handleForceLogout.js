import { notify } from "./notify";
import { store } from "../redux/store";
import { forceLogout } from "../redux/auth/slice";
import { setModalsClose } from "../redux/modals/slice";

export function handleForceLogout(errorMessage) {
  store.dispatch(forceLogout());
  store.dispatch(setModalsClose());

  notify.warning(`${errorMessage}. Please, log in again !`);
}
