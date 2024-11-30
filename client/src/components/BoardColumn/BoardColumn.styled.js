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
        div.action-icons {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          margin-bottom: 5px;
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
