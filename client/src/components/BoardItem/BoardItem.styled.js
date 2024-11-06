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
      width: fit-content;
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
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

      & {
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