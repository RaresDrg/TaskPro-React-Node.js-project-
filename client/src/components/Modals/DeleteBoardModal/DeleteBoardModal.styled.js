import styled from "styled-components";
import DeleteBoardModal from "./DeleteBoardModal";

const StyledDeleteBoardModal = styled(DeleteBoardModal)`
  & {
    .modal-content {
      width: 315px;
      padding: 40px 24px 24px 24px;

      & {
        p {
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          letter-spacing: 0.02em;
          text-align: center;
          width: 240px;
          margin: 0 auto 70px auto;
          color: ${({ theme: { theme } }) =>
            (theme === "dark" && "var(--text-color-white)") ||
            (theme === "light" && "var(--text-color-black)") ||
            (theme === "violet" && "var(--text-color-black)")};
          transition: var(--transition);
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

export default StyledDeleteBoardModal;
