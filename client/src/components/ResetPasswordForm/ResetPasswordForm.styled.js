import styled from "styled-components";
import ResetPasswordForm from "./ResetPasswordForm";

const StyledResetPasswordForm = styled(ResetPasswordForm)`
  background-color: var(--form-bg-black);
  border-radius: 8px;
  padding: 24px;

  & {
    form {
      & {
        > h2 {
          color: var(--text-color-white);
          margin-bottom: 40px;
        }

        div:nth-of-type(1):has(> input) {
          margin-bottom: 14px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    width: 424px;
    padding: 40px;
  }
`;

export default StyledResetPasswordForm;
