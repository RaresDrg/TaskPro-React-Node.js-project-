import styled from "styled-components";
import BoardPage from "./BoardPage";

const StyledBoardPage = styled(BoardPage)`
  height: calc(100dvh - 60px);
  padding: 14px 0 24px 0;
  overflow: hidden;
  border-top: 1px solid grey;
  background-image: ${({ board }) =>
    !board || board.background.value === "bg-default"
      ? "none"
      : `url(${board.background.sources.mobile})`};
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
      }
    }
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 68px);
    background-image: ${({ board }) =>
      !board || board.background.value === "bg-default"
        ? "none"
        : `url(${board.background.sources.tablet})`};
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
      !board || board.background.value === "bg-default"
        ? "none"
        : `url(${board.background.sources.desktop})`};
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
      !board || board.background.value === "bg-default"
        ? "none"
        : `url(${board.background.sources.mobile_2x})`};

    @media (min-width: 768px) {
      background-image: ${({ board }) =>
        !board || board.background.value === "bg-default"
          ? "none"
          : `url(${board.background.sources.tablet_2x})`};
    }

    @media (min-width: 1440px) {
      background-image: ${({ board }) =>
        !board || board.background.value === "bg-default"
          ? "none"
          : `url(${board.background.sources.desktop_2x})`};
    }
  }
`;

export default StyledBoardPage;
