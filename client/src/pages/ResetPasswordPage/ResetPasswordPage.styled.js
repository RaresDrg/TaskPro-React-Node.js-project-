import styled from "styled-components";
import ResetPasswordPage from "./ResetPasswordPage";

const StyledResetPasswordPage = styled(ResetPasswordPage)`
  height: 100dvh;
  overflow: auto;
  background: var(--home_register_login-bg);
  padding: 50px 0;

  & > div {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (min-width: 768px) {
    & > div {
      align-items: center;
    }
  }
`;

export default StyledResetPasswordPage;
