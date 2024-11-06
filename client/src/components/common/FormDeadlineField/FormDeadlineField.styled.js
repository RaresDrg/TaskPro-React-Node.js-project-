import styled from "styled-components";
import FormDeadlineField from "./FormDeadlineField";

const StyledFormDeadlineField = styled(FormDeadlineField)`
  margin-bottom: 40px;

  & {
    h3 {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      opacity: 0.5;
    }

    .react-datepicker__input-container {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--green-color-active)") ||
        (theme === "violet" && "var(--violet-color-active)")};
      transition: var(--transition);

      &:hover {
        opacity: 0.5;
      }

      & {
        svg {
          padding: 0;
          position: static;
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
        }
      }
    }

    .react-datepicker {
      padding: 18px;
      border-radius: 8px;
      background-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "#1f1f1f") ||
        (theme === "light" && "#ffffff") ||
        (theme === "violet" && "#ffffff")};
      border: 0.5px solid grey;
    }

    .react-datepicker__header {
      padding: 0;
      background-color: transparent;
      border: none;
    }

    .react-datepicker__current-month {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      letter-spacing: -0.02em;
    }

    .react-datepicker__header__dropdown {
      margin-top: 14px;
      margin-bottom: 14px;
      background-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "#ffffff33") ||
        (theme === "light" && "#16161633") ||
        (theme === "violet" && "#16161633")};
      height: 1px;
    }

    .react-datepicker__navigation {
      width: 8px;
      height: 13px;
      top: 23px;
      right: 18px;
      transition: var(--transition);

      & > span {
        top: 1px;
        left: 0;
      }

      & > span:before {
        border-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "#ffffff80") ||
          (theme === "light" && "#16161680") ||
          (theme === "violet" && "#16161680")};
        border-width: 2px 2px 0 0;
        transition: var(--transition);
      }
    }

    .react-datepicker__navigation--previous {
      left: 18px;
    }

    .react-datepicker__navigation:hover > span::before {
      border-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--green-color)") ||
        (theme === "light" && "var(--green-color-active)") ||
        (theme === "violet" && "var(--violet-color-active)")};
    }

    .react-datepicker__day-names {
      margin: 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 11px;
    }

    .react-datepicker__day-name {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "#ffffff80") ||
        (theme === "light" && "#16161680") ||
        (theme === "violet" && "#16161680")};
      margin: 0;
    }

    .react-datepicker__month {
      margin: 0;
    }

    .react-datepicker__week {
      display: flex;
      justify-content: space-between;

      &:not(:nth-last-of-type(1)) {
        margin-bottom: 11px;
      }
    }

    .react-datepicker__day {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.02em;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      margin: 0;
    }

    .react-datepicker__day--keyboard-selected {
      background-color: transparent;
    }

    .react-datepicker__day:not([aria-disabled="true"]):not(
        [aria-selected="true"]
      ):hover {
      position: relative;
      z-index: 5;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-black)") ||
        (theme === "light" && "var(--text-color-white)") ||
        (theme === "violet" && "var(--text-color-white)")};
      background-color: transparent;

      &:after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        background-color: grey;
        transition: var(--transition);
      }
    }

    .react-datepicker__day--selected {
      position: relative;
      z-index: 5;
      font-weight: 700;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-black)") ||
        (theme === "light" && "var(--text-color-white)") ||
        (theme === "violet" && "var(--text-color-white)")};
      background-color: transparent;

      &:after {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--green-color)") ||
          (theme === "light" && "var(--green-color-active)") ||
          (theme === "violet" && "var(--violet-color-active)")};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
      }
    }

    .react-datepicker__day--selected:hover {
      background-color: transparent;
    }

    .react-datepicker__day--disabled {
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "#ffffff33") ||
        (theme === "light" && "#16161633") ||
        (theme === "violet" && "#16161633")};
      cursor: not-allowed;
    }
  }
`;

export default StyledFormDeadlineField;
