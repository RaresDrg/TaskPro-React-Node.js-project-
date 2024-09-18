import styled from "styled-components";
import LeftSidebar from "./LeftSidebar";

const StyledLeftSidebar = styled(LeftSidebar)`
  padding: 14px 0 24px 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid grey;
  transition: var(--transition);

  &.dark {
    background-color: var(--leftsideBar-bg-black);
  }
  &.light {
    background-color: var(--leftsideBar-bg-white);
  }
  &.violet {
    background-color: var(--leftsideBar-bg-violet);
  }

  @media (min-width: 768px) {
    padding: 24px 0;
  }

  @media (min-width: 1440px) {
    width: 260px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default StyledLeftSidebar;
