import styled from "styled-components";
import LoginForm from "./LoginForm";

const StyledLoginForm = styled(LoginForm)`
  background-color: var(--form-bg-black);
  border-radius: 8px;
  padding: 24px;

  & {
    form {
      & {
        div.field {
          margin-bottom: 14px;
          /* todo: => verifica aici, chestia aia cand am eraore se lasa in jos */
          /* height: 67px; */
          position: relative;

          & {
            input {
              border-radius: 8px;
              padding: 14px 18px;
              font-size: 14px;
              font-weight: 400;
              line-height: 21px;
              letter-spacing: -0.02em;
              opacity: 0.4;
              border: 1px solid var(--green-color);
              color: var(--text-color-white);
              transition: var(--transition);

              &:-webkit-autofill,
              &:-webkit-autofill:hover,
              &:-webkit-autofill:focus {
                -webkit-background-clip: text;
                -webkit-text-fill-color: var(--text-color-white);
              }

              &::placeholder {
                color: var(--text-color-white);
              }

              &:hover {
                opacity: 0.6;
              }

              &:focus {
                opacity: 1;
              }

              &#passwordInput {
                padding: 14px 64px 14px 18px;
              }
            }

            .error {
              color: var(--error-color);
              font-style: italic;
              font-size: 12px;
              text-transform: lowercase;
            }

            .showPassword {
              position: absolute;
              top: 10.5px;
              right: 18px;
              cursor: pointer;
              opacity: 0.4;
              transition: var(--transition);

              &:hover {
                opacity: 1;
              }
            }
          }
        }

        div.field:nth-last-of-type(1) {
          margin-bottom: 24px;
        }

        div.field.onError {
          & {
            input {
              border: 1px solid var(--error-color);
              opacity: 1;
            }

            .showPassword {
              opacity: 1;
            }
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
