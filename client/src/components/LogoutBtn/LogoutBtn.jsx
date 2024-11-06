import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const LogoutBtn = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={styles}
      onClick={() => dispatch(setModalOpen("LogoutModal"))}
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
