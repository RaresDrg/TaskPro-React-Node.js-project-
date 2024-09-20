import useAuth from "../../hooks/useAuth";
import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { openEditUserModal } from "../../redux/modals/slice";

const UserInfo = ({ className: styles }) => {
  const { user, theme } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className={styles}>
      <span title={user.name} className={`username ${theme}`}>
        {user.name}
      </span>

      <div
        className={`user-photo ${theme}`}
        onClick={() => dispatch(openEditUserModal(true))}
      >
        {user.profilePhotoUrl ? (
          <img src={user.profilePhotoUrl} alt="profile" />
        ) : (
          <svg className={`${theme}`}>
            <use
              href={
                (theme === "dark" ? `${icons}#icon-no-profile-dark` : "") ||
                (theme === "light" ? `${icons}#icon-no-profile-light` : "") ||
                (theme === "violet" ? `${icons}#icon-no-profile-violet` : "")
              }
            ></use>
          </svg>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
