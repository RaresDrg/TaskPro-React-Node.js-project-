import styled from "styled-components";
import FormButton from "./FormButton";

const StyledFormButton = styled(FormButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;
  height: 49px;
  width: ${(props) => (props.variant === "blackBtn" ? "335px" : "100%")};
  border-radius: ${(props) => (props.variant === "blackBtn" ? "16px" : "8px")};
  overflow: hidden;
  position: relative;
  color: var(--text-color-black);
  background-color: ${(props) =>
    (props.variant === "blackBtn" && "#ffffff73") ||
    (props.variant === "greenBtn" && "var(--green-color)") ||
    (props.variant === "violetBtn" && "var(--violet-color)") ||
    (props.variant === "redBtn" && "var(--dashboard-page-bg-white)")};
  border: ${(props) =>
    props.variant === "redBtn" ? "1px solid grey" : "1px solid transparent"};
  box-shadow: ${(props) =>
    props.variant === "blackBtn" ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none"};
  transition: var(--transition);

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: ${(props) =>
      (props.variant === "blackBtn" && "var(--text-color-black)") ||
      (props.variant === "greenBtn" && "var(--green-color-active)") ||
      (props.variant === "violetBtn" && "var(--violet-color-active)") ||
      (props.variant === "redBtn" && "var(--error-color)")};
    transition: var(--transition);
  }

  &:disabled {
    background-color: grey;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: ${(props) =>
      props.variant === "blackBtn" ? "scale(1.02)" : "scale(1.005)"};
    border: ${(props) =>
      props.variant === "blackBtn"
        ? "1px solid var(--text-color-black)"
        : "1px solid var(--text-color-white)"};
    box-shadow: ${(props) =>
      (props.variant === "blackBtn" && "0px 0px 18px 0px grey") ||
      (props.variant === "greenBtn" &&
        "0px 0px 18px 0px var(--green-color-active)") ||
      (props.variant === "violetBtn" &&
        "0px 0px 18px 0px var(--violet-color-active)") ||
      (props.variant === "redBtn" && "0px 0px 18px 0px grey")};
    color: var(--text-color-white);

    &:before {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    width: ${(props) => (props.variant === "blackBtn" ? "344px" : "100%")};
  }
`;

export default StyledFormButton;
