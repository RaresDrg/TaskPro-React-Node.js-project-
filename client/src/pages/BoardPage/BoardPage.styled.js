import styled from "styled-components";
import BoardPage from "./BoardPage";
import { getBg } from "../../utils/utils";

const StyledBoardPage = styled(BoardPage)`
  height: calc(100dvh - 60px);
  padding: 14px 0 24px 0;
  overflow: hidden;
  border-top: 1px solid grey;
  background-image: ${({ board }) =>
    (board?.background === undefined && "none") ||
    (board.background === "bg-default" && "none") ||
    (board.background && `url(${getBg("mobile", board.background)})`)};
  background-position: center;
  background-size: cover;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--dashboard-page-bg-black)") ||
    (theme === "light" && "var(--dashboard-page-bg-white)") ||
    (theme === "violet" && "var(--dashboard-page-bg-violet)")};
  transition: var(--transition);

  & {
    > div {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;

      & {
        h1 {
          font-size: 14px;
          font-weight: 900;
          line-height: 21px;
          letter-spacing: -0.02em;
          color: var(--text-color-white);
          width: fit-content;
          max-width: calc(100% - 110px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: alias;
          padding: 3px 23px;
          border-radius: 40px 0;
          background-color: ${({ theme: { theme } }) =>
            (theme === "dark" && "#9dc888b3") ||
            (theme === "light" && "#9dc888b3") ||
            (theme === "violet" && "#5255BCb3")};
          border: 0.5px solid grey;
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 39px;
          transition: var(--transition);
        }

        div.columns {
          flex: 1;
          display: flex;
          gap: 18px;
          padding-bottom: 24px;
          overflow-x: auto;

          &::-webkit-scrollbar {
            height: 12px;
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
      }
    }
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 68px);
    background-image: ${({ board }) =>
      (board?.background === undefined && "none") ||
      (board.background === "bg-default" && "none") ||
      (board.background && `url(${getBg("tablet", board.background)})`)};
    padding: 26px 0 32px 0;

    & > div > h1 {
      font-size: 18px;
      line-height: 27px;
      margin-bottom: 26px;
    }
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
    background-image: ${({ board }) =>
      (board?.background === undefined && "none") ||
      (board.background === "bg-default" && "none") ||
      (board.background && `url(${getBg("desktop", board.background)})`)};
    padding: 14px 0 24px 0;

    & > div > h1 {
      margin-bottom: 14px;
    }
  }

  /* 2X Retina */
  @media (min-device-pixel-ratio: 2),
    (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: ${({ board }) =>
      (board?.background === undefined && "none") ||
      (board.background === "bg-default" && "none") ||
      (board.background &&
        `url(${getBg("mobile", `${board.background}-2x`)})`)};

    @media (min-width: 768px) {
      background-image: ${({ board }) =>
        (board?.background === undefined && "none") ||
        (board.background === "bg-default" && "none") ||
        (board.background &&
          `url(${getBg("tablet", `${board.background}-2x`)})`)};
    }

    @media (min-width: 1440px) {
      background-image: ${({ board }) =>
        (board?.background === undefined && "none") ||
        (board.background === "bg-default" && "none") ||
        (board.background &&
          `url(${getBg("desktop", `${board.background}-2x`)})`)};
    }
  }
`;

export default StyledBoardPage;
