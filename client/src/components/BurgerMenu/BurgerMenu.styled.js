import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";

const StyledBurgerMenu = styled(BurgerMenu)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);

  & > aside {
    width: 0;
  }

  &.visible {
    opacity: 1;
    visibility: visible;

    & > aside {
      width: 225px;
    }
  }

  @media (min-width: 768px) {
    &.visible > aside {
      width: 260px;
    }
  }
`;

export default StyledBurgerMenu;
