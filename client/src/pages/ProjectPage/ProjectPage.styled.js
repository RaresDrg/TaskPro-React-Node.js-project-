import styled from "styled-components";
import ProjectPage from "./ProjectPage";

const StyledProjectPage = styled(ProjectPage)`
  min-height: calc(100dvh - 60px);
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

  @media (min-width: 768px) {
    min-height: calc(100dvh - 68px);
  }
`;

export default StyledProjectPage;
