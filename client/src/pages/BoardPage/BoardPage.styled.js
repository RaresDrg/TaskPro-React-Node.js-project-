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
    }
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 68px);
    background-image: ${({ board }) =>
      !board || board.background.value === "bg-default"
        ? "none"
        : `url(${board.background.sources.tablet})`};
    padding: 26px 0 32px 0;
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
    background-image: ${({ board }) =>
      !board || board.background.value === "bg-default"
        ? "none"
        : `url(${board.background.sources.desktop})`};
    padding: 14px 0 24px 0;
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
