import styled from "styled-components";
import PencilIcon from "./PencilIcon.jsx";

const StyledPencilIcon = styled(PencilIcon)`
  width: 16px;
  height: 16px;
  opacity: 0.5;
  cursor: pointer;
  margin-top: 3px;
  transition: var(--transition);

  &:hover {
    transform: scale(1.3);
    opacity: 1;
  }
`;

export default StyledPencilIcon;
