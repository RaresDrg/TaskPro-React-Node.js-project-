import styled from "styled-components";
import FiltersModal from "./FiltersModal";

const StyledFiltersModal = styled(FiltersModal)`
  & {
    .modal-content {
      width: 300px;

      & {
        h2 {
          margin-bottom: 14px;
        }

        > div {
          padding-top: 14px;
          border-top: ${({ theme: { theme } }) =>
            (theme === "dark" && "1px solid #ffffff1a") ||
            (theme === "light" && "1px solid #1616161a") ||
            (theme === "violet" && "1px solid #1616161a")};
          position: relative;

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

            > button {
              position: absolute;
              top: 14px;
              right: 0;
              text-decoration: underline;
              font-size: 12px;
              font-weight: 400;
              line-height: 18px;
              letter-spacing: -0.02em;
              opacity: 0.5;
              color: ${({ theme: { theme } }) =>
                (theme === "dark" && "var(--text-color-white)") ||
                (theme === "light" && "var(--text-color-black)") ||
                (theme === "violet" && "var(--text-color-black)")};
              transition: var(--transition);

              &:hover {
                opacity: 1;
              }
            }

            div {
              display: flex;
              flex-direction: column;
              gap: 8px;

              > button {
                width: fit-content;
                font-size: 12px;
                font-weight: 400;
                line-height: 18px;
                letter-spacing: -0.02em;
                text-transform: capitalize;
                display: flex;
                align-items: center;
                gap: 8px;
                color: ${({ theme: { theme } }) =>
                  (theme === "dark" && "var(--text-color-white)") ||
                  (theme === "light" && "var(--text-color-black)") ||
                  (theme === "violet" && "var(--text-color-black)")};
                opacity: 0.5;
                transition: var(--transition);

                &:hover:not(.active) {
                  opacity: 0.8;
                }

                &.active {
                  opacity: 1;
                  font-weight: 600;

                  &:before {
                    border: 0.5px solid gray;
                    transform: scale(1.15);
                  }
                }

                &::before {
                  content: "";
                  display: block;
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  position: relative;
                  border: 0.5px solid transparent;
                  transition: var(--transition);
                }

                &:nth-of-type(1):before {
                  background-color: #8fa1d0;
                }
                &:nth-of-type(2):before {
                  background-color: #e09cb5;
                }
                &:nth-of-type(3):before {
                  background-color: #bedbb0;
                }
                &:nth-of-type(4):before {
                  background-color: #cecece;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledFiltersModal;
