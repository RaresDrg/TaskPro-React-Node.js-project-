import styled from "styled-components";
import MyBoards from "./MyBoards";

const StyledMyBoards = styled(MyBoards)`
  margin: 70px 14px 40px 14px;

  & {
    & > span {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.02em;
      opacity: 0.5;
      transition: var(--transition);

      &.dark,
      &.violet {
        color: var(--text-color-white);
      }
      &.light {
        color: var(--text-color-black);
      }
    }

    & > div {
      margin-top: 8px;
      padding: 14px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: var(--transition);

      &.dark,
      &.violet {
        border-top: 1px solid #ffffff1a;
        border-bottom: 1px solid #ffffff1a;
      }
      &.light {
        border-top: 1px solid #1616161a;
        border-bottom: 1px solid #1616161a;
      }

      & {
        & > span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          width: 76px;
          transition: var(--transition);

          &.dark,
          &.violet {
            color: var(--text-color-white);
          }
          &.light {
            color: var(--text-color-black);
          }
        }

        & > button.create-btn {
          width: 40px;
          height: 36px;
          border-radius: 6px;
          padding: 8px 10px;
          transition: var(--transition);

          &.dark,
          &.light {
            background-color: var(--green-color);

            &:hover {
              background-color: var(--green-color-active);
              box-shadow: 0px 0px 16px 0px var(--green-color-active);
            }
          }

          &.violet {
            background-color: var(--violet-color);

            &:hover {
              background-color: var(--violet-color-active);
              box-shadow: 0px 0px 16px 0px var(--violet-color);
            }
          }

          & {
            svg {
              stroke: var(--text-color-black);
              transition: var(--transition);
            }
          }

          &:hover {
            transform: scale(1.15);
            border: 0.5px solid var(--text-color-white);

            & {
              svg {
                stroke: var(--text-color-white);
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    margin: 60px 24px 40px 24px;
  }
`;

export default StyledMyBoards;
