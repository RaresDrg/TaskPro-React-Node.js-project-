import styled from "styled-components";
import NeedHelpModal from "./NeedHelpModal";

const StyledNeedHelpModal = styled(NeedHelpModal)`
  & {
    .modal-content div:has(> #emailInput) {
      margin-bottom: 14px;

      & {
        > #emailInput {
          opacity: 1;
          cursor: not-allowed;
        }
      }
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

export default StyledNeedHelpModal;
