import { useSelector } from "react-redux";
import { selectModals } from "../redux/modals/selectors";

const useModals = () => {
  const modals = useSelector(selectModals);

  return modals;
};

export default useModals;
