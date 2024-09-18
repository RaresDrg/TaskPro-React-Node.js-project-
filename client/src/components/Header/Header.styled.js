import styled from "styled-components";
import Header from "./Header";

const StyledHeader = styled(Header)`
  padding: 14px 0px;
  /*todo: => verificat sa nu "strice", la theme dropdown  */
  /* border-bottom: 1px solid grey; */
  transition: var(--transition);

  &.dark {
    background-color: var(--header-bg-black);
  }

  &.light,
  &.violet {
    background-color: var(--header-bg-white);
  }

  & > div {
    display: flex;
    align-items: center;
    min-width: 100%;
  }

  @media (min-width: 768px) {
    padding: 18px 0px;
  }

  /* todo= > parte din primul todo de mai sus */
  /* @media (min-width: 1440px) {
    border: none;
  } */
`;

export default StyledHeader;
