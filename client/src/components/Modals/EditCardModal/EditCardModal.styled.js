import styled from "styled-components";
import EditCardModal from "./EditCardModal";

const StyledEditCardModal = styled(EditCardModal)`
  div:has(> #titleInput) {
    margin-bottom: 14px;
  }
`;

export default StyledEditCardModal;
