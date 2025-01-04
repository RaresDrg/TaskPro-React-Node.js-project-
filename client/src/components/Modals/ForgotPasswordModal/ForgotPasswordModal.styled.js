import styled from "styled-components";
import ForgotPasswordModal from "./ForgotPasswordModal";

const StyledForgotPasswordModal = styled(ForgotPasswordModal)`
  form > div > input {
    border: 1px solid var(--green-color-active);
    color: var(--text-color-black);
    caret-color: var(--text-color-black);

    &::placeholder {
      color: var(--text-color-black);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: var(--text-color-black);
    }
  }
`;

export default StyledForgotPasswordModal;
