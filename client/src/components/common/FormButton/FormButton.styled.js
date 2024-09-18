import styled from "styled-components";
import FormButton from "./FormButton";

const StyledFormButton = styled(FormButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.02em;
  height: 49px;
  width: ${(props) => (props.variant === "blackBtn" ? "335px" : "100%")};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  color: var(--text-color-black);
  background-color: ${(props) =>
    (props.variant === "blackBtn" && "var(--text-color-white)") ||
    (props.variant === "greenBtn" && "var(--green-color)") ||
    (props.variant === "violetBtn" && "var(--violet-color)") ||
    (props.variant === "redBtn" && "var(--dashboard-page-bg-white)")};
  border: ${(props) =>
    props.variant === "redBtn" ? "1px solid grey" : "none"};
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
      (props.variant === "redBtn" && "red")};
    transition: var(--transition);
  }

  &:disabled {
    background-color: grey;
    opacity: 0.7;
    box-shadow: none;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.02);
    border: ${(props) =>
      (props.variant === "blackBtn" && "none") ||
      (props.variant === "greenBtn" && "1px solid var(--text-color-white)") ||
      (props.variant === "violetBtn" && "1px solid var(--text-color-white)") ||
      (props.variant === "redBtn" && "none")};
    box-shadow: ${(props) =>
      (props.variant === "blackBtn" &&
        "0px 4px 10px 0px var(--text-color-black)") ||
      (props.variant === "greenBtn" &&
        "0px 0px 18px 0px var(--green-color-active)") ||
      (props.variant === "violetBtn" &&
        "0px 0px 18px 0px var(--violet-color-active)") ||
      (props.variant === "redBtn" && "0px 0px 18px 0px red")};
    color: var(--text-color-white);

    &:before {
      width: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    width: ${(props) => (props.variant === "blackBtn" ? "344px" : "100%")};
  }
`;

export default StyledFormButton;