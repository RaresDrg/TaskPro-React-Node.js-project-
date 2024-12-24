import styled from "styled-components";
import AuthNavigation from "./AuthNavigation";

const StyledAuthNavigation = styled(AuthNavigation)`
  display: flex;
  gap: 14px;
  margin-bottom: 40px;

  & {
    a:not(.google-btn) {
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
      letter-spacing: -0.02em;
      opacity: 0.3;
      color: var(--text-color-white);
      transition: var(--transition);
    }

    a.active {
      opacity: 1;
      font-weight: bold;
      cursor: not-allowed;
    }

    a:hover:not(.active) {
      opacity: 1;
      color: var(--green-color);
    }

    a.google-btn {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      right: -50px;
      display: flex;
      justify-content: center;
      align-items: end;
      transform: rotate(45deg);
      background-color: #cececee6;
      opacity: 0.5;
      transition: var(--transition);

      &:hover {
        opacity: 0.95;

        > svg {
          opacity: 1;
        }
      }

      & {
        > svg {
          width: 33px;
          height: 33px;
          transform: rotate(-45deg);
          margin-left: 6px;
          margin-bottom: 2px;
          opacity: 0.7;
          transition: var(--transition);
        }
      }
    }
  }
`;

export default StyledAuthNavigation;
