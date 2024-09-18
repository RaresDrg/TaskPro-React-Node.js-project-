import styled from "styled-components";
import UserInfo from "./UserInfo";

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;
  gap: 15px;

  & {
    .username {
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      line-height: 21px;
      letter-spacing: -0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 140px;
      transition: var(--transition);

      &.dark {
        color: var(--text-color-white);
      }

      &.light,
      &.violet {
        color: var(--text-color-black);
      }

      &:hover {
        transform: scale(0.9);
        color: grey;
      }
    }

    .user-photo {
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      overflow: hidden;
      border: 0.5px solid grey;
      transition: var(--transition);

      &:hover {
        transform: scale(1.15);

        &:has(> svg.dark) {
          box-shadow: var(--green-color) 0px 0px 10px 0px;
        }

        &:has(> svg.light) {
          box-shadow: var(--green-color-active) 0px 0px 10px 0px;
        }

        &:has(> svg.violet) {
          box-shadow: var(--violet-color-active) 0px 0px 10px 0px;
        }
      }

      &:active {
        transform: scale(1.25);
      }

      &:has(> img) img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default StyledUserInfo;
