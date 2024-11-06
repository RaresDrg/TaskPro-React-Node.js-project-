import styled from "styled-components";
import ThemeDropdown from "./ThemeDropdown";

const StyledThemeDropdown = styled(ThemeDropdown)`
  margin-left: auto;
  margin-right: 20px;
  position: relative;

  & {
    button.dropdown-trigger {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 4px;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      transition: var(--transition);

      &:before {
        content: "";
        height: 1.5px;
        width: 0;
        border-radius: 8px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--green-color)") ||
          (theme === "light" && "var(--green-color)") ||
          (theme === "violet" && "var(--violet-color)")};
        transition: var(--transition);
      }

      &:hover,
      &.triggered {
        opacity: 1;

        &:before {
          width: 100%;
          left: 0;
        }
      }
    }

    ul.dropdown-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      border-radius: 8px;
      padding: 18px 44px 18px 18px;
      position: absolute;
      z-index: 50;
      top: 30px;
      right: 50%;
      transform: translateX(50%);
      box-shadow: 0px 4px 16px 0px #1111111a;
      border: 1px solid grey;
      background-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--header-bg-black)") ||
        (theme === "light" && "var(--header-bg-white)") ||
        (theme === "violet" && "var(--header-bg-white)")};
      opacity: 0;
      visibility: hidden;
      transition: var(--transition);

      &.visible {
        opacity: 1;
        visibility: visible;
        top: 45px;
      }

      &:before {
        content: "";
        height: 20px;
        width: 20px;
        position: absolute;
        top: -10px;
        right: 50%;
        transform: translateX(50%) rotate(-45deg);
        border-bottom: 1px solid transparent;
        border-left: 1px solid transparent;
        border-top: 1px solid grey;
        border-right: 1px solid grey;
        background-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--header-bg-black)") ||
          (theme === "light" && "var(--header-bg-white)") ||
          (theme === "violet" && "var(--header-bg-white)")};
        transition: var(--transition);
      }

      & {
        li {
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;
          letter-spacing: -0.02em;
          text-transform: capitalize;
          cursor: pointer;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          opacity: 0.5;
          transition: var(--transition);

          &:hover {
            opacity: 1;
          }

          &.active {
            font-weight: bold;
            opacity: 1;
            color: ${({ theme: { theme } }) =>
              (theme === "dark" && "var(--green-color-active)") ||
              (theme === "light" && "var(--green-color-active)") ||
              (theme === "violet" && "var(--violet-color-active)")};
          }
        }
      }
    }
  }
`;

export default StyledThemeDropdown;
