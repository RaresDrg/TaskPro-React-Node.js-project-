import styled from "styled-components";
import AddColumnBtn from "./AddColumnBtn";

const StyledAddColumnBtn = styled(AddColumnBtn)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;
  height: 56px;
  flex: 1 0 334px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0.5px solid grey;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "#121212") ||
    (theme === "light" && "var(--text-color-white)") ||
    (theme === "violet" && "var(--text-color-white)")};
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);

  &:before {
    content: "";
    background-color: #8080804d;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: var(--transition);
  }

  &:hover {
    border: ${({ theme: { theme } }) =>
      (theme === "dark" && "0.5px solid var(--text-color-white)") ||
      (theme === "light" && "0.5px solid var(--text-color-black)") ||
      (theme === "violet" && "0.5px solid var(--text-color-black)")};
    transform: scale(1);

    &:before {
      width: 100%;
    }
  }

  & {
    svg {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      padding: 7px;
      background-color: ${({ theme: { theme } }) =>
        (theme === "dark" && "var(--text-color-white)") ||
        (theme === "light" && "var(--text-color-black)") ||
        (theme === "violet" && "var(--violet-color-active)")};
      stroke: ${({ theme: { theme } }) =>
        (theme === "dark" && "#121212") ||
        (theme === "light" && "var(--text-color-white)") ||
        (theme === "violet" && "var(--text-color-white)")};
      transition: var(--transition);
    }
  }

  @media (min-width: 768px) {
    flex: 0 0 335px;
  }
`;

export default StyledAddColumnBtn;
