import styled from "styled-components";
import LogoutBtn from "./LogoutBtn";

const StyledLogoutBtn = styled(LogoutBtn)`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 24px;
  opacity: 0.7;
  width: fit-content;
  transition: var(--transition);

  &.dark {
    color: var(--text-color-white);

    svg {
      stroke: var(--green-color-active);
    }
  }

  &.light {
    color: var(--text-color-black);

    svg {
      stroke: var(--green-color-active);
    }
  }

  &.violet {
    color: var(--text-color-white);

    svg {
      stroke: var(--text-color-white);
    }
  }

  &:hover {
    opacity: 1;

    svg {
      stroke: red;
      transform: scale(1.15);
    }

    span:after {
      width: 100%;
      background-color: red;
    }
  }

  & {
    svg {
      width: 32px;
      height: 32px;
      transition: var(--transition);
    }

    span {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      position: relative;

      &:after {
        content: "";
        display: block;
        height: 1px;
        width: 0;
        border-radius: 50%;
        transition: var(--transition);
      }
    }
  }

  @media (min-width: 1440px) {
    & {
      span {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;

export default StyledLogoutBtn;
