import { NavLink } from "react-router-dom";

const AuthNavigation = ({ className: styles }) => {
  return (
    <nav className={styles}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log in</NavLink>
    </nav>
  );
};

export default AuthNavigation;
