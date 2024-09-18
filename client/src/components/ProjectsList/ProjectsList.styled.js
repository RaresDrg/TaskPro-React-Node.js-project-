import styled from "styled-components";
import ProjectsList from "./ProjectsList";

const StyledProjectsList = styled(ProjectsList)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 40px;

  /* todo: daca vreau sa afiseze proiectele cu scroll */

  /* min-height: 100px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  } */
`;

export default StyledProjectsList;
