import styled from "styled-components";
import ThemeDropdown from "./ThemeDropdown";

const StyledThemeDropdown = styled(ThemeDropdown)`
  margin-left: auto;
  margin-right: 25px;
  position: relative;

  & {
    .dropdown-trigger {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition);

      &:before {
        content: "";
        height: 1.5px;
        width: 0;
        border-radius: 8px;
        position: absolute;
        bottom: 0;
        right: 0;
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

      &.dark {
        color: var(--text-color-white);
        &:before {
          background-color: var(--green-color);
        }
      }

      &.light {
        color: var(--text-color-black);
        &:before {
          background-color: var(--green-color);
        }
      }

      &.violet {
        color: var(--text-color-black);
        &:before {
          background-color: var(--violet-color);
        }
      }
    }

    .dropdown-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      border-radius: 8px;
      padding: 18px 44px 18px 18px;
      position: absolute;
      top: 20px;
      right: 50%;
      transform: translateX(50%);
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
        transition: var(--transition);
      }

      &.dark {
        background-color: var(--header-bg-black);
        border: 1px solid var(--green-color-active);
        box-shadow: 0px 4px 16px 0px #1111111a;
        color: var(--text-color-white);

        &:before {
          background-color: var(--header-bg-black);
          border-top: 1px solid var(--green-color-active);
          border-right: 1px solid var(--green-color-active);
        }

        & {
          li:nth-of-type(2) {
            font-weight: bold;
            opacity: 1;
            color: var(--green-color-active);
          }
        }
      }

      &.light {
        background-color: var(--header-bg-white);
        border: 1px solid var(--green-color-active);
        box-shadow: 0px 4px 16px 0px #1111111a;
        color: var(--text-color-black);

        &:before {
          background-color: var(--header-bg-white);
          border-top: 1px solid var(--green-color-active);
          border-right: 1px solid var(--green-color-active);
        }

        & {
          li:nth-of-type(1) {
            font-weight: bold;
            opacity: 1;
            color: var(--green-color-active);
          }
        }
      }

      &.violet {
        background-color: var(--header-bg-white);
        border: 1px solid var(--violet-color-active);
        box-shadow: 0px 4px 16px 0px #1111111a;
        color: var(--text-color-black);

        &:before {
          background-color: var(--header-bg-white);
          border-top: 1px solid var(--violet-color-active);
          border-right: 1px solid var(--violet-color-active);
        }

        & {
          li:nth-of-type(3) {
            font-weight: bold;
            opacity: 1;
            color: var(--violet-color-active);
          }
        }
      }

      & {
        li {
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;
          letter-spacing: -0.02em;
          cursor: pointer;
          opacity: 0.5;
          transition: var(--transition);

          &:hover {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      }
    }
  }
`;

export default StyledThemeDropdown;
