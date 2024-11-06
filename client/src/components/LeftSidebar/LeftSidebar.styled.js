import styled from "styled-components";
import LeftSidebar from "./LeftSidebar";

const StyledLeftSidebar = styled(LeftSidebar)`
  padding: 14px 0 24px 0;
  min-height: 100%;
  width: 225px;
  display: flex;
  flex-direction: column;
  border-right: 1px groove grey;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--leftsideBar-bg-black)") ||
    (theme === "light" && "var(--leftsideBar-bg-white)") ||
    (theme === "violet" && "var(--leftsideBar-bg-violet)")};
  transition: var(--transition);

  @media (min-width: 768px) {
    padding: 24px 0;
    width: 260px;
  }

  @media (min-width: 1440px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default StyledLeftSidebar;
