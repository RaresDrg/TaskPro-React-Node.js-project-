import styled from "styled-components";
import Modal from "./Modal";

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  overflow: auto;
  background: var(--modal-bg);
  backdrop-filter: var(--modal-blur);
  display: grid;
  place-items: center;
  padding: 30px 20px;
  animation: fadeIn 0.35s ease-in-out;

  &.hidden {
    animation: fadeOut 0.35s ease-in-out forwards;

    & {
      .modal-content {
        animation: translateOut 0.35s ease-in-out;
      }
    }
  }

  & {
    .modal-content {
      width: 100%;
      padding: 24px;
      border-radius: 8px;
      position: relative;
      background-color: ${({ theme: { theme } }) =>
        (theme === null && "var(--form-bg-white)") ||
        (theme === "dark" && "var(--form-bg-black)") ||
        (theme === "light" && "var(--form-bg-white)") ||
        (theme === "violet" && "var(--form-bg-white)")};
      border: ${({ theme: { theme } }) =>
        (theme === null && "1px solid #161616e6") ||
        (theme === "dark" && "1px solid #ffffff99") ||
        (theme === "light" && "1px solid #161616e6") ||
        (theme === "violet" && "1px solid #161616e6")};
      box-shadow: ${({ theme: { theme } }) =>
        (theme === null && "0px 4px 16px 0px #16161699") ||
        (theme === "dark" && "0px 4px 16px 0px #ffffff33") ||
        (theme === "light" && "0px 4px 16px 0px #16161699") ||
        (theme === "violet" && "0px 4px 16px 0px #16161699")};
      animation: translateIn 0.35s ease-in-out;
      transition: var(--transition);

      & {
        .close-btn {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          position: absolute;
          top: 14px;
          right: 14px;
          cursor: pointer;
          color: ${({ theme: { theme } }) =>
            (theme === null && "var(--text-color-black)") ||
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          transition: var(--transition);

          &:hover {
            padding: 2px;
            color: ${({ theme: { theme } }) =>
              (theme === null && "var(--text-color-white)") ||
              (theme === "dark" && "var(--text-color-black)") ||
              (theme === "light" && "var(--text-color-white)") ||
              (theme === "violet" && "var(--text-color-white)")};
            background-color: ${({ theme: { theme } }) =>
              (theme === null && "var(--green-color-active)") ||
              (theme === "dark" && "var(--green-color)") ||
              (theme === "light" && "var(--green-color-active)") ||
              (theme === "violet" && "var(--violet-color-active)")};
            transform: scale(1.2);
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    & {
      .modal-content {
        width: 350px;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes translateIn {
    from {
      transform: translateY(-200px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes translateOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-200px);
    }
  }
`;

export default StyledModal;
