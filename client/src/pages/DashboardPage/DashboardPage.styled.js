import styled from "styled-components";
import DashboardPage from "./DashboardPage";

const StyledDashboardPage = styled(DashboardPage)`
  min-height: calc(100dvh - 60px);
  padding: 14px 0px;
  display: flex;
  align-items: center;
  border-top: 1px solid grey;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--dashboard-page-bg-black)") ||
    (theme === "light" && "var(--dashboard-page-bg-white)") ||
    (theme === "violet" && "var(--dashboard-page-bg-violet)")};
  transition: var(--transition);

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
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--dashboard-text-color-white)") ||
        (theme === "light" && "var(--dashboard-text-color-black)") ||
        (theme === "violet" && "var(--dashboard-text-color-black)")};
      transition: var(--transition);

      b {
        cursor: pointer;
        color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--green-color-active)") ||
          (theme === "light" && "var(--green-color-active)") ||
          (theme === "violet" && "var(--violet-color-active)")};
        transition: var(--transition);

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  @media (min-width: 768px) {
    min-height: calc(100dvh - 68px);

    & > div {
      p {
        font-size: 14px;
        line-height: 18px;
        width: 486px;
      }
    }
  }

  @media (min-width: 1440px) {
    margin-left: 260px;
  }
`;

export default StyledDashboardPage;
