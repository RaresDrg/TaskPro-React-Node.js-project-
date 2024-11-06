import styled from "styled-components";
import AddCardModal from "./AddCardModal";

const StyledAddCardModal = styled(AddCardModal)`
  div:has(> #titleInput) {
    margin-bottom: 14px;
  }
`;

export default StyledAddCardModal;
