import styled from "styled-components";
import DashboardPage from "./DashboardPage";

const StyledDashboardPage = styled(DashboardPage)`
  /* todo: test fara min */
  min-height: calc(100dvh - 60px);
  /* todo: daca adaug bordura  la header*/
  /* min-height: calc(100dvh - 61px); */
  padding: 14px 0px;
  display: flex;
  align-items: center;
  transition: var(--transition);

  &.dark {
    background-color: var(--dashboard-page-bg-black);
  }
  &.light {
    background-color: var(--dashboard-page-bg-white);
  }
  &.violet {
    background-color: var(--dashboard-page-bg-violet);
  }

  & > div {
    display: flex;
    justify-content: center;
    min-width: 100%;

    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.02em;
      text-align: center;
      width: 335px;
      transition: var(--transition);

      &.dark {
        color: var(--dashboard-text-color-white);
        b {
          color: var(--green-color-active);
        }
      }

      &.light {
        color: var(--dashboard-text-color-black);
        b {
          color: var(--green-color-active);
        }
      }

      &.violet {
        color: var(--dashboard-text-color-black);

        b {
          color: var(--violet-color-active);
        }
      }

      b {
        transition: var(--transition);
      }
    }
  }

  @media (min-width: 768px) {
    min-height: calc(100dvh - 68px);
    /* todo: daca adaug bordura  la header*/
    /* min-height: calc(100dvh - 69px); */

    & > div {
      p {
        font-size: 14px;
        line-height: 18px;
        width: 486px;
      }
    }
  }

  /* todo: poate merge sters daca nu am bordura la header */
  @media (min-width: 1440px) {
    min-height: calc(100vh - 68px);
  }
`;

export default StyledDashboardPage;
