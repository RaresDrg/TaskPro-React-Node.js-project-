import { NavLink } from "react-router-dom";
import icons from "../../../assets/icons/icons.svg";

// todo: vercel
// "http://localhost:3000/api/users/google-auth"
// "https://taskproserver.vercel.app/api/users/google-auth";

const AuthNavigation = ({ className: styles }) => {
  return (
    <nav className={styles}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log in</NavLink>

      <NavLink
        to="https://taskproserver.vercel.app/api/users/google-auth"
        className="google-btn"
      >
        <svg>
          <use href={`${icons}#icon-google`}></use>
        </svg>
      </NavLink>
    </nav>
  );
};

export default AuthNavigation;
