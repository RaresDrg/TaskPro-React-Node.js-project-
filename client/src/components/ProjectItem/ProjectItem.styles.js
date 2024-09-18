import styled from "styled-components";
import ProjectItem from "./ProjectItem";

const StyledProjectItem = styled(ProjectItem)`
  padding: 20px 14px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 66px;
  transition: var(--transition);

  &:has(> a):after {
    content: "";
    display: block;
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    transition: var(--transition);
  }

  &:has(> a.active),
  &:has(> a:hover) {
    a {
      opacity: 1;
    }

    &:after {
      width: 4px;
    }
  }

  &:has(> a.active.dark) {
    background-color: #1f1f1f;

    &:after {
      background-color: var(--green-color);
    }
  }
  &:has(> a.active.light) {
    background-color: #f6f6f7;

    &:after {
      background-color: var(--green-color);
    }
  }
  &:has(> a.active.violet) {
    background-color: #ffffff80;

    &:after {
      background-color: var(--text-color-white);
    }
  }

  &:has(> a:not(.active):hover):after {
    background-color: grey;
  }

  & {
    a {
      display: flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
      opacity: 0.5;
      transition: var(--transition);

      &.dark,
      &.violet {
        color: var(--text-color-white);
      }
      &.light {
        color: var(--text-color-black);
      }

      & {
        svg {
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
      }
    }

    div.action-icons {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 5px;

      &.dark,
      &.violet {
        color: var(--text-color-white);
      }

      &.light {
        color: var(--text-color-black);
      }

      svg {
        width: 16px;
        height: 16px;
        opacity: 0.5;
        cursor: pointer;
        transition: var(--transition);

        &:hover {
          transform: scale(1.3);
          opacity: 1;
        }
      }

      & > svg:first-of-type {
        margin-top: 2px;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 20px 24px;

    & {
      a {
        gap: 8px;
      }
    }
  }
`;

export default StyledProjectItem;
