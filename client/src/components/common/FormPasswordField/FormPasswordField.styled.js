import styled from "styled-components";
import FormPasswordField from "./FormPasswordField";

const StyledFormPasswordField = styled(FormPasswordField)`
  margin-bottom: 24px;
  position: relative;

  &.onError {
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

  & {
    input {
      border-radius: 8px;
      padding: 14px 64px 14px 18px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.02em;
      border: ${({ theme: { theme } }) =>
        (theme === null && "1px solid var(--green-color)") ||
        (theme === "dark" && "1px solid var(--green-color)") ||
        (theme === "light" && "1px solid var(--green-color-active)") ||
        (theme === "violet" && "1px solid var(--violet-color-active)")};
      color: ${({ theme: { theme } }) =>
        (theme === null && "var(--text-color-white)") ||
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      caret-color: ${({ theme: { theme } }) =>
        (theme === null && "var(--text-color-white)") ||
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      opacity: 0.4;
      transition: var(--transition);

      &::placeholder {
        color: ${({ theme: { theme } }) =>
          (theme === null && "var(--text-color-white)") ||
          (theme === "dark" && "var(--text-color-white)") ||
          (theme === "light" && "var(--text-color-black)") ||
          (theme === "violet" && "var(--text-color-black)")};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({ theme: { theme } }) =>
          (theme === null && "var(--text-color-white)") ||
          (theme === "dark" && "var(--text-color-white)") ||
          (theme === "light" && "var(--text-color-black)") ||
          (theme === "violet" && "var(--text-color-black)")};
        -webkit-background-clip: text;
      }

      &:focus {
        opacity: 1;
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
      color: ${({ theme: { theme } }) =>
        (theme === null && "var(--text-color-white)") ||
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default StyledFormPasswordField;
