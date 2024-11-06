import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";

const StyledLoadingScreen = styled(LoadingScreen)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  display: grid;
  place-items: center;

  & {
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(65%) brightness(25%);
    }

    h1 {
      display: flex;
      align-items: center;
      gap: 13px;
      color: #fff;
      mix-blend-mode: difference;
      font-size: 45px;
      font-weight: 900;
      letter-spacing: 0.04em;
      opacity: 0.7;

      & > div {
        margin-top: 8px;

        & > svg {
          height: 50px;
          width: 50px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    & {
      h1 {
        font-size: 55px;

        & > div {
          margin-top: 12px;

          & > svg {
            height: 60px;
            width: 60px;
          }
        }
      }
    }
  }

  @media (min-width: 1440px) {
    & {
      h1 {
        font-size: 65px;
        gap: 15px;

        & > div {
          margin-top: 14px;

          & > svg {
            height: 70px;
            width: 70px;
          }
        }
      }
    }
  }
`;

export default StyledLoadingScreen;
