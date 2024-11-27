import styled from "styled-components";
import BoardColumn from "./BoardColumn";

const StyledBoardColumn = styled(BoardColumn)`
  flex: 0 0 347px;
  max-height: fit-content;
  display: flex;
  flex-direction: column;

  & {
    div.column-heading {
      width: 335px;
      height: 56px;
      padding: 18px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "#121212") ||
        (theme === "light" && "var(--text-color-white)") ||
        (theme === "violet" && "var(--text-color-white)")};
      transition: var(--transition);

      & {
        h3 {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 220px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          transition: var(--transition);

          &:hover {
            color: grey;
            cursor: alias;
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
          margin-bottom: 5px;

          svg {
            width: 16px;
            height: 16px;
            opacity: 0.5;
            cursor: pointer;
            transition: var(--transition);

            &:hover {
              transform: scale(1.3);
              opacity: 1;
            }
          }

          & > svg:first-of-type {
            margin-top: 3px;
          }
        }
      }
    }

    div.cards-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;

      &:not(:has(> div)) {
        height: 14px;
      }

      &:has(> div) {
        margin-top: 14px;
        margin-bottom: 14px;
      }

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 12px;
        background-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--text-color-black)") ||
          (theme === "light" && "#e8e8e8") ||
          (theme === "violet" && "#e8e8e8")};
        cursor: pointer;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color: grey;
        cursor: move;

        &:hover {
          background-color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--green-color-active)") ||
            (theme === "light" && "var(--green-color-active)") ||
            (theme === "violet" && "var(--violet-color-active)")};
        }
      }
    }

    div.column-heading ~ button {
      flex: 0 0 56px;
      width: 335px;

      &:hover {
        box-shadow: none;
        transform: scale(1);
      }
    }
  }

  @media (min-width: 768px) {
    flex: 0 0 351px;
  }
`;

export default StyledBoardColumn;
