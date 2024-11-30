import styled from "styled-components";
import TrashIcon from "./TrashIcon";

const StyledTrashIcon = styled(TrashIcon)`
  width: 16px;
  height: 16px;
  opacity: 0.5;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    opacity: 1;
  }
`;

export default StyledTrashIcon;
