import styled from "styled-components";
import FormPriorityField from "./FormPriorityField";

const StyledFormPriorityField = styled(FormPriorityField)`
  margin-bottom: 14px;

  & {
    h3 {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: -0.02em;
      opacity: 0.5;
      color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--text-color-black)")};
      margin-bottom: 4px;
    }

    div.radio-options {
      display: flex;
      gap: 8px;

      & {
        input {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          border: 0.5px solid transparent;
          transition: var(--transition);

          &:hover {
            border: 0.5px solid grey;
            transform: scale(1.15);
          }

          &::before {
            content: "";
            display: block;
            height: 8px;
            width: 8px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: var(--transition);
          }

          &:nth-of-type(1) {
            background-color: #8fa1d0;

            &:checked {
              background-color: transparent;
              border: 1px solid #8fa1d0;
              transform: scale(1.3);
            }

            &:checked::before {
              background-color: #8fa1d0;
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          &:nth-of-type(2) {
            background-color: #e09cb5;

            &:checked {
              background-color: transparent;
              border: 1px solid #e09cb5;
              transform: scale(1.3);
            }

            &:checked::before {
              background-color: #e09cb5;
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          &:nth-of-type(3) {
            background-color: #bedbb0;

            &:checked {
              background-color: transparent;
              border: 1px solid #bedbb0;
              transform: scale(1.3);
            }

            &:checked::before {
              background-color: #bedbb0;
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          &:nth-of-type(4) {
            background-color: #cecece;

            &:checked {
              background-color: transparent;
              border: 1px solid #cecece;
              transform: scale(1.3);
            }

            &:checked::before {
              background-color: #cecece;
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

export default StyledFormPriorityField;
