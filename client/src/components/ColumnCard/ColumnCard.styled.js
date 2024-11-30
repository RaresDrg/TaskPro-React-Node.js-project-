import styled from "styled-components";
import ColumnCard from "./ColumnCard";

const StyledColumnCard = styled(ColumnCard)`
  flex: 0 0 164px;
  width: 335px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 14px 14px 14px 24px;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "#121212") ||
    (theme === "light" && "var(--text-color-white)") ||
    (theme === "violet" && "var(--text-color-white)")};
  transition: var(--transition);

  &:before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    background: ${({ card }) =>
      (card.priority === "low" && "#8fa1d0") ||
      (card.priority === "medium" && "#e09cb5") ||
      (card.priority === "high" && "#bedbb0") ||
      (card.priority === "without" && "#cecece")};
    position: absolute;
    top: 0;
    left: 0;
  }

  & {
    > div {
      margin-top: auto;
      padding-top: 14px;
      display: flex;
      align-items: flex-end;
      border-top: ${({ theme: { theme } }) =>
        (theme === "dark" && "1px solid #ffffff1a") ||
        (theme === "light" && "1px solid #1616161a") ||
        (theme === "violet" && "1px solid #1616161a")};
      transition: var(--transition);

      & {
        div.priority {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-right: 14px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          transition: var(--transition);

          & {
            > span:nth-of-type(1) {
              font-size: 8px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: -0.02em;
              opacity: 0.5;
            }

            > span:nth-of-type(2) {
              font-size: 10px;
              font-weight: 400;
              line-height: 15px;
              letter-spacing: -0.02em;
              text-transform: capitalize;
              display: flex;
              align-items: center;
              gap: 4px;

              &:before {
                content: "";
                display: block;
                width: 12px;
                height: 12px;
                background: ${({ card }) =>
                  (card.priority === "low" && "#8fa1d0") ||
                  (card.priority === "medium" && "#e09cb5") ||
                  (card.priority === "high" && "#bedbb0") ||
                  (card.priority === "without" && "#cecece")};
                border-radius: 50%;
              }
            }
          }
        }

        div.deadline {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          transition: var(--transition);

          & {
            > span:nth-of-type(1) {
              font-size: 8px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: -0.02em;
              opacity: 0.5;
            }

            > span:nth-of-type(2) {
              font-size: 10px;
              font-weight: 400;
              line-height: 15px;
              letter-spacing: -0.02em;

              &.red {
                color: var(--error-color);
                font-weight: 600;
              }
            }
          }
        }

        div.action-icons {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          margin-left: auto;
          margin-bottom: 1px;
        }
      }
    }
  }
`;

export default StyledColumnCard;
