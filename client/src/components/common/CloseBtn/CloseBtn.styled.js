import styled from "styled-components";
import CloseBtn from "./CloseBtn";

const StyledCloseBtn = styled(CloseBtn)`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);

  & > svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: scale(1.2);
  }

  &.dark {
    color: var(--text-color-white);

    &:hover {
      color: var(--text-color-black);
      background-color: var(--green-color);
    }
  }

  &.light {
    color: var(--text-color-black);

    &:hover {
      color: var(--text-color-white);
      background-color: var(--green-color-active);
    }
  }

  &.violet {
    color: var(--text-color-black);

    &:hover {
      color: var(--text-color-white);
      background-color: var(--violet-color-active);
    }
  }
`;

export default StyledCloseBtn;
