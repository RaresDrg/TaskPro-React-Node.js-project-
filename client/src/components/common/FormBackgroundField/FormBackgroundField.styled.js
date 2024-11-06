import styled from "styled-components";
import FormBackgroundField from "./FormBackgroundField";

const StyledFormBackgroundField = styled(FormBackgroundField)`
  margin-bottom: 40px;

  & {
    h3 {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: -0.02em;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      margin-bottom: 14px;
    }

    div.radio-options {
      min-width: 252px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      & {
        div {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          overflow: hidden;
          filter: brightness(50%) opacity(50%);
          border: 0.5px solid transparent;
          transition: var(--transition);

          &:has(> input:checked) {
            transform: scale(1.15);
            filter: brightness(100%) opacity(100%);
            border: 0.5px solid #808080;
          }

          &:has(> input:not(:checked)):has(> label:hover) {
            transform: scale(1.05);
            filter: brightness(85%) opacity(85%);
          }

          & {
            input {
              display: none;
            }

            label {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    & {
      div.radio-options {
        width: 252px;
      }
    }
  }
`;

export default StyledFormBackgroundField;
