import styled from "styled-components";
import EditUserModal from "./EditUserModal";

const StyledEditUserModal = styled(EditUserModal)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  /* todo: => intrabare: => aici de ce nu flex? */
  display: grid;
  place-items: center;
  padding: 30px 20px;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);

  &.visible {
    opacity: 1;
    visibility: visible;

    & {
      .modal-content {
        transform: translateY(0);
        /* todo: => poate merge o alta tranzitie */
        /* transform: scale(1); */
        /* transform: rotateY(0); */
      }
    }
  }

  & {
    .modal-content {
      transform: translateY(-200px);
      /* transform: scale(0); */
      /* transform: rotateY(90deg); */
      width: 335px;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      transition: var(--transition);

      &.dark {
        background-color: var(--form-bg-black);
        border: 1px solid var(--text-color-white);
        box-shadow: 0px 4px 16px 0px var(--green-color);
      }

      &.light {
        background-color: var(--form-bg-white);
        border: 1px solid var(--text-color-black);
        box-shadow: 0px 4px 16px 0px var(--green-color);
      }

      &.violet {
        background-color: var(--form-bg-white);
        border: 1px solid var(--text-color-black);
        box-shadow: 0px 4px 16px 0px var(--violet-color);
      }

      & {
        form {
          & {
            h1 {
              font-size: 18px;
              font-weight: 500;
              line-height: 27px;
              letter-spacing: -0.02em;
              margin-bottom: 24px;

              &.dark {
                color: var(--text-color-white);
              }

              &.light,
              &.violet {
                color: var(--text-color-black);
              }
            }

            div.photoField {
              width: 68px;
              height: 68px;
              margin: 0 auto 25px auto;
              position: relative;

              & {
                &:has(> svg) > svg {
                  display: block;
                  border-radius: 9px;
                  border: 0.5px solid grey;
                }

                &:has(> img) > img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  object-position: center;
                  border-radius: 9px;
                  border: 0.5px solid grey;
                }

                input {
                  display: none;
                }

                label {
                  width: 24px;
                  height: 24px;
                  border-radius: 6px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  bottom: -12px;
                  left: 50%;
                  transform: translate(-50%);
                  background-color: #cecece;
                  border: 0.5px solid grey;
                  transition: var(--transition);

                  & > svg {
                    width: 12px;
                    height: 12px;
                    stroke: var(--text-color-black);
                    transition: var(--transition);
                  }

                  &:hover {
                    &.dark,
                    &.light {
                      background-color: var(--green-color-active);
                    }

                    &.violet {
                      background-color: var(--violet-color-active);
                    }

                    & > svg {
                      stroke: var(--text-color-white);
                    }
                  }
                }
              }
            }

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
                  transition: var(--transition);

                  &.dark {
                    border: 1px solid var(--green-color);
                    color: var(--text-color-white);

                    &::placeholder {
                      color: var(--text-color-white);
                    }

                    &:-webkit-autofill,
                    &:-webkit-autofill:hover,
                    &:-webkit-autofill:focus {
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: var(--text-color-white);
                    }
                  }

                  &.light {
                    border: 1px solid var(--green-color-active);
                    color: var(--text-color-black);

                    &::placeholder {
                      color: var(--text-color-black);
                    }

                    &:-webkit-autofill,
                    &:-webkit-autofill:hover,
                    &:-webkit-autofill:focus {
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: var(--text-color-black);
                    }
                  }

                  &.violet {
                    border: 1px solid var(--violet-color-active);
                    color: var(--text-color-black);

                    &::placeholder {
                      color: var(--text-color-black);
                    }

                    &:-webkit-autofill,
                    &:-webkit-autofill:hover,
                    &:-webkit-autofill:focus {
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: var(--text-color-black);
                    }
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
    }
  }

  @media (min-width: 768px) {
    & {
      .modal-content {
        width: 400px;
      }
    }
  }
`;

export default StyledEditUserModal;
