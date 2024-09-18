import styled from "styled-components";
import Logo from "./Logo";

const LogoOnHomePage = styled(Logo)`
  display: flex;
  align-items: center;
  gap: 14px;

  & {
    svg {
      width: 40px;
      height: 40px;
    }

    span {
      font-size: 28px;
      font-weight: 600;
      line-height: 42px;
      letter-spacing: -0.04em;
      color: var(--text-color-black);
    }
  }

  @media (min-width: 768px) {
    & {
      svg {
        width: 48px;
        height: 48px;
      }

      span {
        font-size: 40px;
        line-height: 60px;
      }
    }
  }
`;

const LogoOnSidebar = styled(Logo)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-left: 14px;
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }

  & {
    svg {
      width: 32px;
      height: 32px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.04em;
      transition: var(--transition);

      &.dark,
      &.violet {
        color: var(--text-color-white);
      }

      &.light {
        color: var(--text-color-black);
      }
    }
  }

  @media (min-width: 768px) {
    margin-left: 24px;
  }
`;

export { LogoOnHomePage, LogoOnSidebar };
