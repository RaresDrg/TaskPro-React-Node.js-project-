import styled from "styled-components";
import FormTitle from "./FormTitle";

const StyledFormTitle = styled(FormTitle)`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: -0.02em;
  color: ${({ theme: { theme } }) =>
    (theme === null && "var(--text-color-black)") ||
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  margin-bottom: 24px;
`;

export default StyledFormTitle;
