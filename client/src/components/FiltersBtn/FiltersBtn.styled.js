import styled from "styled-components";
import FiltersBtn from "./FiltersBtn";

const StyledFiltersBtn = styled(FiltersBtn)`
  position: absolute;
  top: 0;
  right: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: var(--text-color-black);
  background-color: #f5f5f5;
  border: 0.5px solid grey;
  border-radius: 20px;
  padding: 1px 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  opacity: 0.7;
  transition: var(--transition);

  &:hover,
  &.active {
    opacity: 1;
    border-radius: 0px 40px;
    text-transform: capitalize;
  }

  @media (min-width: 768px) {
    right: 32px;
  }

  @media (min-width: 1440px) {
    right: 24px;
  }
`;

export default StyledFiltersBtn;
