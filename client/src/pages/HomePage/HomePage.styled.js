import styled from "styled-components";
import HomePage from "./HomePage";

const StyledHomePage = styled(HomePage)`
  height: 100dvh;
  overflow: auto;
  background: var(--home_register_login-bg);
  padding: 50px 0;

  & > div {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & {
      img {
        width: 124px;
        height: 124px;
        margin-bottom: 14px;
      }

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.02em;
        color: var(--text-color-black);
        text-align: center;
        width: 334px;
        margin-top: 24px;
        margin-bottom: 48px;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }

  @media (min-width: 768px) {
    & > div {
      & {
        img {
          width: 162px;
          height: 162px;
          margin-bottom: 24px;
        }

        p {
          width: 473px;
        }
      }
    }
  }
`;

export default StyledHomePage;
