import styled from "styled-components";
import EditUserModal from "./EditUserModal";

const StyledEditUserModal = styled(EditUserModal)`
  & {
    .modal-content div:not(:nth-of-type(1)):not(:nth-last-of-type(1)) {
      margin-bottom: 14px;
    }
  }

  @media (min-width: 768px) {
    & {
      .modal-content {
        width: 400px;
      }
    }
  }
`;

export default StyledEditUserModal;
