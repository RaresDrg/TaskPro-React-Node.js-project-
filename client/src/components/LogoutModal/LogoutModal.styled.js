import styled from "styled-components";
import LogoutModal from "./LogoutModal";

const StyledLogoutModal = styled(LogoutModal)`
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
  padding: 50px 30px;
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
      width: 315px;
      padding: 40px 24px 24px 24px;
      border-radius: 8px;
      position: relative;
      transition: var(--transition);

      &.dark {
        background-color: var(--form-bg-black);
        border: 1px solid var(--text-color-white);
        box-shadow: 0px 4px 16px 0px var(--green-color);

        & {
          p {
            color: var(--text-color-white);
          }
        }
      }

      &.light {
        background-color: var(--form-bg-white);
        border: 1px solid var(--text-color-black);
        box-shadow: 0px 4px 16px 0px var(--green-color);

        & {
          p {
            color: var(--text-color-black);
          }
        }
      }

      &.violet {
        background-color: var(--form-bg-white);
        border: 1px solid var(--text-color-black);
        box-shadow: 0px 4px 16px 0px var(--violet-color);

        & {
          p {
            color: var(--text-color-black);
          }
        }
      }

      & {
        p {
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          letter-spacing: 0.02em;
          text-align: center;
          width: 240px;
          margin: 0 auto 70px auto;
        }

        div.buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    & {
      .modal-content {
        width: 350px;

        & {
          p {
            width: 250px;
            font-size: 25px;
            line-height: 35px;
            margin: 0 auto 80px auto;
          }
        }
      }
    }
  }

  @media (min-width: 1440px) {
    & {
      .modal-content {
        width: 450px;
        padding: 35px 40px 30px 40px;

        & {
          p {
            width: 310px;
            margin: 0 auto 55px auto;
          }

          div.buttons-wrapper {
            flex-direction: row;
            gap: 15px;
          }
        }
      }
    }
  }
`;

export default StyledLogoutModal;
