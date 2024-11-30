import styled from "styled-components";
import BoardItem from "./BoardItem";

const StyledBoardItem = styled(BoardItem)`
  padding: 20px 14px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 66px;
  transition: var(--transition);

  &:has(> a.active) {
    background-color: ${({ theme: { theme } }) =>
      (theme === "dark" && "#1f1f1f") ||
      (theme === "light" && "#f6f6f7") ||
      (theme === "violet" && "#ffffff80")};
  }

  &:after {
    content: "";
    display: block;
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    transition: var(--transition);
  }

  &:has(> a.active):after {
    background-color: ${({ theme: { theme } }) =>
      (theme === "dark" && "var(--green-color)") ||
      (theme === "light" && "var(--green-color)") ||
      (theme === "violet" && "var(--text-color-white)")};
    width: 4px;
  }

  &:has(> a:not(.active):hover):after {
    background-color: grey;
    width: 4px;
  }

  & {
    a {
      display: flex;
      align-items: center;
      gap: 4px;
      max-width: 100%;
      opacity: 0.5;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-white)")};
      transition: var(--transition);

      &:hover,
      &.active {
        opacity: 1;
      }

      & {
        svg {
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
        }

        &:has(+ div.action-icons) > span {
          max-width: 120px;
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
        (theme === "violet" && "var(--text-color-white)")};
      margin-bottom: 5px;
    }
  }

  @media (min-width: 768px) {
    padding: 20px 24px;

    & {
      a {
        gap: 8px;
      }
    }
  }
`;

export default StyledBoardItem;
