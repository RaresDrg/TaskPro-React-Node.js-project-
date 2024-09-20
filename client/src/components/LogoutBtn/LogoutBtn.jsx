import useAuth from "../../hooks/useAuth";
import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { openLogoutModal } from "../../redux/modals/slice";

const LogoutBtn = ({ className: styles }) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();

  return (
    <button
      type="button"
      onMouseDown={() => dispatch(openLogoutModal(true))}
      className={`${styles} ${theme}`}
      data-secondary-action="close burger menu"
    >
      <svg>
        <use href={`${icons}#icon-logout`}></use>
      </svg>
      <span>Log out</span>
    </button>
  );
};

export default LogoutBtn;
