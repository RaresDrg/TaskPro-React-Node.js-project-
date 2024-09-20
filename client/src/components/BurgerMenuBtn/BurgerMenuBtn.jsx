import useAuth from "../../hooks/useAuth";
import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { openBurgerMenu } from "../../redux/modals/slice";

const BurgerMenuBtn = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();

  return (
    <button
      type="button"
      onClick={() => dispatch(openBurgerMenu(true))}
      className={`${styles}`}
    >
      <svg className={`${theme}`}>
        <use href={`${icons}#icon-burger-menu`}></use>
      </svg>
    </button>
  );
};

export default BurgerMenuBtn;
