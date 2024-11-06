import { useAuth } from "../../hooks/hooks";
import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const UserInfo = ({ className: styles }) => {
  const { user, theme } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className={styles}>
      <span title={user.name} className="username">
        {user.name}
      </span>

      <div
        className="user-photo"
        onClick={() => dispatch(setModalOpen("EditUserModal"))}
      >
        {user.profilePhotoUrl ? (
          <img src={user.profilePhotoUrl} alt="profile" />
        ) : (
          <svg>
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
