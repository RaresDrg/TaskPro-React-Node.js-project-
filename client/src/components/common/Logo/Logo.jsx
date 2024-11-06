import icons from "../../../assets/icons/icons.svg";
import { useAuth } from "../../../hooks/hooks";

const Logo = ({ className: styles }) => {
  const { theme } = useAuth();

  return (
    <a href="/" className={styles}>
      <svg>
        <use
          href={
            theme === "violet"
              ? `${icons}#icon-whiteLogo`
              : `${icons}#icon-blackLogo`
          }
        ></use>
      </svg>
      <span className={theme}>Task Pro</span>
    </a>
  );
};

export default Logo;
