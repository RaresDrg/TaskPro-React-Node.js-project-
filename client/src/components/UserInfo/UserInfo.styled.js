import styled from "styled-components";
import UserInfo from "./UserInfo";

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;
  gap: 15px;

  & {
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
        box-shadow: 0px 0px 10px 0px grey;
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
