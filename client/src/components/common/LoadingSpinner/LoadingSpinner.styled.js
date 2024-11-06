import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const LoaderColor = "#fff";
const LoaderSize = 14.6;
const LoaderOffset = 1.7;
const LoaderTiming = "ease-in-out";

const StyledLoadingSpinner = styled(LoadingSpinner)`
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  display: grid;
  place-items: center;
  background: rgba(21, 21, 21, 0.65);
  backdrop-filter: blur(1px);

  .Loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${LoaderSize}rem;
    margin-top: ${LoaderSize / 2}rem;
    margin-bottom: ${LoaderSize / 2}rem;

    &:before,
    &:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: ${LoaderTiming};
      filter: drop-shadow(
        0 0 ${LoaderOffset / 2.25}rem rgba(255, 255, 255, 0.75)
      );
    }

    &:before {
      width: 100%;
      padding-bottom: 100%;
      box-shadow: inset 0 0 0 ${LoaderOffset}rem ${LoaderColor};
      animation-name: pulsA;
    }
    &:after {
      width: calc(100% - ${LoaderOffset * 2}rem);
      padding-bottom: calc(100% - ${LoaderOffset * 2}rem);
      box-shadow: 0 0 0 0 ${LoaderColor};
      animation-name: pulsB;
    }
  }

  @keyframes pulsA {
    0% {
      box-shadow: inset 0 0 0 ${LoaderOffset}rem ${LoaderColor};
      opacity: 1;
    }
    50%,
    100% {
      box-shadow: inset 0 0 0 0 ${LoaderColor};
      opacity: 0;
    }
  }

  @keyframes pulsB {
    0%,
    50% {
      box-shadow: 0 0 0 0 ${LoaderColor};
      opacity: 0;
    }
    100% {
      box-shadow: 0 0 0 ${LoaderOffset}rem ${LoaderColor};
      opacity: 1;
    }
  }
`;

export default StyledLoadingSpinner;
