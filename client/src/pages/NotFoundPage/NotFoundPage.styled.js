import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";

const StyledNotFoundPage = styled(NotFoundPage)`
  min-height: 100dvh;
  width: 100%;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  position: relative;
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 50px;

  & {
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(99%) brightness(32%);
    }

    .go-back-btn {
      position: fixed;
      top: -60px;
      left: -60px;
      width: 120px;
      height: 120px;
      background-color: #5e5e5e;
      transform: rotate(45deg);
      transition: var(--transition);

      &:hover {
        background-color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--green-color-active)") ||
          (theme === "light" && "var(--green-color-active)") ||
          (theme === "violet" && "var(--violet-color-active)") ||
          (theme === null && "red")};
      }

      & {
        .arrow {
          position: absolute;
          top: 38px;
          right: -3px;
          transform: rotate(45deg);
        }
      }
    }

    h2 {
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      letter-spacing: 0.1em;
      color: var(--text-color-white);
      mix-blend-mode: hard-light;
      text-align: center;
    }

    h1 {
      font-size: 90px;
      font-weight: 900;
      line-height: 100px;
      letter-spacing: 0.05em;
      color: var(--text-color-white);
      mix-blend-mode: color-dodge;
    }

    p {
      font-size: 15px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0.15em;
      font-style: italic;
      mix-blend-mode: hard-light;
      color: var(--text-color-white);
      min-width: 305px;
      max-width: 480px;
      text-indent: 35px;
      margin: 0 auto;
    }
  }

  @media (min-width: 768px) {
    justify-content: space-evenly;

    & {
      h2 {
        font-size: 30px;
        line-height: 35px;
      }

      h1 {
        font-size: 120px;
        line-height: 130px;
      }

      p {
        font-size: 20px;
        max-width: 560px;
        line-height: 28px;
      }
    }
  }

  @media (min-width: 1440px) {
    & {
      h2 {
        font-size: 35px;
        line-height: 40px;
      }

      h1 {
        font-size: 150px;
        line-height: 160px;
      }
    }
  }
`;

export default StyledNotFoundPage;
