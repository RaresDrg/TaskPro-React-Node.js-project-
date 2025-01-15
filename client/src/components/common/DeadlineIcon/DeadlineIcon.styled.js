import styled from "styled-components";
import DeadlineIcon from "./DeadlineIcon";

const StyledDeadlineIcon = styled(DeadlineIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  stroke: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--green-color)") ||
    (theme === "light" && "var(--green-color-active)") ||
    (theme === "violet" && "var(--violet-color-active)")};
  filter: ${({ theme: { theme } }) => {
    const color =
      (theme === "dark" && "var(--green-color)") ||
      (theme === "light" && "var(--green-color)") ||
      (theme === "violet" && "var(--violet-color)");

    return `drop-shadow(0 0 5px ${color}) 
    drop-shadow(0 0 10px ${color})
    drop-shadow(0 0 15px ${color})`;
  }};
  margin-top: 3px;
  margin-right: 4px;
  transition: var(--transition);
`;

export default StyledDeadlineIcon;
