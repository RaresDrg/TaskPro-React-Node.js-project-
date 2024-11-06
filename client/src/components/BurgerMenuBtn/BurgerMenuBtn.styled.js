import styled from "styled-components";
import BurgerMenuBtn from "./BurgerMenuBtn";

const StyledBurgerMenuBtn = styled(BurgerMenuBtn)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);

  &:hover {
    transform: scale(0.9);
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export default StyledBurgerMenuBtn;
