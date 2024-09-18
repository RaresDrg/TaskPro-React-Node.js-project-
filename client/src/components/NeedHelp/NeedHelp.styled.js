import styled from "styled-components";
import NeedHelp from "./NeedHelp";

const StyledNeedHelp = styled(NeedHelp)`
  margin: auto 14px 24px 14px;
  padding: 14px;
  border-radius: 8px;
  transition: var(--transition);

  &.dark {
    background-color: #1f1f1f;

    & {
      p {
        color: var(--text-color-white);

        b {
          color: var(--green-color-active);
        }
      }

      button {
        color: var(--text-color-white);
      }
    }
  }

  &.light {
    background-color: #f6f6f7;

    & {
      p {
        color: var(--text-color-black);

        b {
          color: var(--green-color-active);
        }
      }

      button {
        color: var(--text-color-black);
      }
    }
  }

  &.violet {
    background-color: #ecedfd66;

    & {
      p {
        color: var(--text-color-white);

        b {
          color: var(--violet-color-active);
        }
      }

      button {
        color: var(--text-color-white);
      }
    }
  }

  & {
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.02em;
      margin-top: 14px;
      margin-bottom: 18px;
      transition: var(--transition);

      b {
        transition: var(--transition);
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);

      & {
        svg {
          width: 20px;
          height: 20px;
        }

        span {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: -0.02em;
        }
      }

      &:hover {
        transform: scale(1.1);
        color: grey;
      }
    }
  }

  @media (min-width: 768px) {
    margin: auto 24px 24px 24px;
    padding: 20px;

    & {
      p {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;

export default StyledNeedHelp;
