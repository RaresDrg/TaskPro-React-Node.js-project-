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
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-white)")};
      transition: var(--transition);
    }

    & > div {
      margin-top: 8px;
      padding: 14px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: ${({ theme: { theme } }) =>
        (theme === "dark" && "1px solid #ffffff1a") ||
        (theme === "light" && "1px solid #1616161a") ||
        (theme === "violet" && "1px solid #ffffff1a")};
      border-bottom: ${({ theme: { theme } }) =>
        (theme === "dark" && "1px solid #ffffff1a") ||
        (theme === "light" && "1px solid #1616161a") ||
        (theme === "violet" && "1px solid #ffffff1a")};
      transition: var(--transition);

      & {
        & > span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          width: 76px;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-white)")};
          transition: var(--transition);
        }

        & > svg.create-btn {
          width: 40px;
          height: 36px;
          border-radius: 6px;
          padding: 8px 10px;
          cursor: pointer;
          border: 0.5px solid transparent;
          stroke: var(--text-color-black);
          background-color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--green-color)") ||
            (theme === "light" && "var(--green-color)") ||
            (theme === "violet" && "var(--violet-color)")};
          transition: var(--transition);

          &:hover {
            background-color: ${({ theme: { theme } }) =>
              (theme === "dark" && "var(--green-color-active)") ||
              (theme === "light" && "var(--green-color-active)") ||
              (theme === "violet" && "var(--violet-color-active)")};
            box-shadow: ${({ theme: { theme } }) =>
              (theme === "dark" && "0px 0px 16px 0px var(--green-color)") ||
              (theme === "light" && "0px 0px 16px 0px var(--green-color)") ||
              (theme === "violet" && "0px 0px 16px 0px var(--violet-color)")};
            transform: scale(1.15);
            border: 0.5px solid var(--text-color-white);
            stroke: var(--text-color-white);
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
