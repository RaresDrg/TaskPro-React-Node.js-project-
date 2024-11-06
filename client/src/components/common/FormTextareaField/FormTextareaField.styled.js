import styled from "styled-components";
import FormTextareaField from "./FormTextareaField";

const StyledFormTextareaField = styled(FormTextareaField)`
  margin-bottom: 24px;

  &.onError {
    & {
      textarea {
        border: 1px solid var(--error-color);
        opacity: 1;
      }
    }
  }

  & {
    textarea {
      border-radius: 8px;
      padding: 14px 18px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.02em;
      border: ${({ theme: { theme } }) =>
        (theme === "dark" && "1px solid var(--green-color)") ||
        (theme === "light" && "1px solid var(--green-color-active)") ||
        (theme === "violet" && "1px solid var(--violet-color-active)")};
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      caret-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      opacity: 0.4;
      transition: var(--transition);

      &::placeholder {
        color: ${({ theme: { theme } }) =>
          (theme === "dark" && "var(--text-color-white)") ||
          (theme === "light" && "var(--text-color-black)") ||
          (theme === "violet" && "var(--text-color-black)")};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({ theme: { theme } }) =>
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
  }
`;

export default StyledFormTextareaField;
