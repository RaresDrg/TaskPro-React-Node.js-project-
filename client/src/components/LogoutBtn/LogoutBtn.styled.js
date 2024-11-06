import styled from "styled-components";
import LogoutBtn from "./LogoutBtn";

const StyledLogoutBtn = styled(LogoutBtn)`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: 24px;
  opacity: 0.7;
  width: fit-content;
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-white)")};
  transition: var(--transition);

  & {
    svg {
      width: 32px;
      height: 32px;
      stroke: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--green-color-active)") ||
        (theme === "light" && "var(--green-color-active)") ||
        (theme === "violet" && "var(--text-color-white)")};
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
