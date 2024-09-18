import styled from "styled-components";
import BurgerMenuBtn from "./BurgerMenuBtn";

const StyledBurgerMenuBtn = styled(BurgerMenuBtn)`
  width: 24px;
  height: 24px;

  & {
    svg {
      transition: var(--transition);

      &.dark {
        stroke: var(--text-color-white);
      }

      &.light,
      &.violet {
        stroke: var(--text-color-black);
      }

      &:hover {
        transform: scale(0.8);
        opacity: 0.8;
      }

      &:active {
        transform: scale(0.3);
        opacity: 0.3;
      }
    }
  }

  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export default StyledBurgerMenuBtn;
