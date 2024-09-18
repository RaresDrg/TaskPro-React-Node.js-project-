import styled from "styled-components";
import AuthNavigation from "./AuthNavigation";

const StyledAuthNavigation = styled(AuthNavigation)`
  display: flex;
  gap: 14px;
  margin-bottom: 40px;

  & {
    a {
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
  }
`;

export default StyledAuthNavigation;
