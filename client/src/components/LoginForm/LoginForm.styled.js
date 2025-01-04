import styled from "styled-components";
import LoginForm from "./LoginForm";

const StyledLoginForm = styled(LoginForm)`
  background-color: var(--form-bg-black);
  border-radius: 8px;
  padding: 24px;
  overflow: hidden;

  & {
    form {
      position: relative;

      & {
        div:nth-of-type(1) {
          margin-bottom: 14px;
        }

        div:nth-of-type(2) {
          margin-bottom: 40px;
        }

        div:nth-of-type(2):has(> input + span) {
          margin-bottom: 22.5px;
        }

        .forgotBtn {
          position: absolute;
          bottom: 66px;
          right: 0;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
          letter-spacing: -0.02em;
          opacity: 0.4;
          color: var(--text-color-white);
          transition: var(--transition);

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    width: 424px;
    padding: 40px;
  }
`;

export default StyledLoginForm;
