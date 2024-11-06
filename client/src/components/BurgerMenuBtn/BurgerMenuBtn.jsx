import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const BurgerMenuBtn = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <svg
      className={styles}
      onClick={() => dispatch(setModalOpen("BurgerMenu"))}
    >
      <use href={`${icons}#icon-burger-menu`}></use>
    </svg>
  );
};

export default BurgerMenuBtn;
