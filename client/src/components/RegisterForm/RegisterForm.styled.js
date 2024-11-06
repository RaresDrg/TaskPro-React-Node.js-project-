import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const StyledRegisterForm = styled(RegisterForm)`
  background-color: var(--form-bg-black);
  border-radius: 8px;
  padding: 24px;

  & {
    div:has(> input):not(:nth-last-of-type(1)) {
      margin-bottom: 14px;
    }
  }

  @media (min-width: 768px) {
    width: 424px;
    padding: 40px;
  }
`;

export default StyledRegisterForm;
