import styled from "styled-components";
import EditUserModal from "./EditUserModal";

const StyledEditUserModal = styled(EditUserModal)`
  & {
    .modal-content div:not(:nth-of-type(1)):not(:nth-last-of-type(1)) {
      margin-bottom: 14px;
    }

    div:has(> input[disabled]) {
      > input[disabled] {
        cursor: not-allowed;
      }

      &:after {
        content: "Email change is not allowed. Your account is connected through Google";
        display: block;
        margin-top: 3px;
        font-size: 12px;
        font-style: italic;
        color: var(--error-color);
        max-height: 0;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
      }

      &:hover {
        > input[disabled] {
          border: 1px solid var(--error-color);
          opacity: 1;
        }

        &:after {
          max-height: 100px;
          opacity: 1;
          visibility: visible;
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

export default StyledEditUserModal;
