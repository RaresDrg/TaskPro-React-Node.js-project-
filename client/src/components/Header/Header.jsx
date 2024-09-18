import Container from "../common/Container/Container.styled";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn.styled";
import ThemeDropdown from "../ThemeDropdown/ThemeDropdown.styled";
import UserInfo from "../UserInfo/UserInfo.styled";
import useResponsive from "../../hooks/useResponsive";
import useAuth from "../../hooks/useAuth";

const Header = ({ className: styles }) => {
  const { isOnMobile, isOnTablet } = useResponsive();
  const { theme } = useAuth();

  return (
    <header className={`${styles} ${theme}`}>
      <Container>
        {(isOnMobile || isOnTablet) && <BurgerMenuBtn />}
        <ThemeDropdown />
        <UserInfo />
      </Container>
    </header>
  );
};

export default Header;
