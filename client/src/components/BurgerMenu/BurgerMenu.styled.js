import styled from "styled-components";
import BurgerMenu from "./BurgerMenu";

const StyledBurgerMenu = styled(BurgerMenu)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  animation: fadeIn 0.35s ease-in-out;

  & > aside {
    animation: slideIn 0.35s ease-in-out;
  }

  &.hidden {
    animation: fadeOut 0.35s ease-in-out forwards;

    & > aside {
      animation: slideOut 0.35s ease-in-out;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-260px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-260px);
    }
  }
`;

export default StyledBurgerMenu;
