import styled from "styled-components";
import EllipsisTooltip from "./EllipsisTooltip";

const StyledEllipsisTooltip = styled(EllipsisTooltip)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

const Username = styled(StyledEllipsisTooltip)`
  font-size: 14px;
  font-weight: bold;
  line-height: 21px;
  letter-spacing: -0.02em;
  max-width: 140px;
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);

  @media (min-width: 768px) {
    max-width: 220px;
  }
`;

const BoardItemTitle = styled(StyledEllipsisTooltip)`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.02em;
`;

const BoardTitle = styled(StyledEllipsisTooltip)`
  font-size: 14px;
  font-weight: 900;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: var(--text-color-white);
  width: fit-content;
  max-width: calc(100% - 110px);
  padding: 3px 23px;
  border-radius: 40px 0;
  background-color: ${({ theme: { theme } }) =>
    (theme === "dark" && "#9dc888b3") ||
    (theme === "light" && "#9dc888b3") ||
    (theme === "violet" && "#5255BCb3")};
  border: 0.5px solid grey;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 39px;
  transition: var(--transition);

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 26px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 14px;
  }
`;

const ColumnTitle = styled(StyledEllipsisTooltip)`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.02em;
  max-width: 220px;
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);
`;

const CardTitle = styled(StyledEllipsisTooltip)`
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);
`;

const CardDescription = styled(StyledEllipsisTooltip)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.02em;
  opacity: 0.5;
  margin-bottom: 14px;
  color: ${({ theme: { theme } }) =>
    (theme === "dark" && "var(--text-color-white)") ||
    (theme === "light" && "var(--text-color-black)") ||
    (theme === "violet" && "var(--text-color-black)")};
  transition: var(--transition);
`;

export {
  Username,
  BoardItemTitle,
  BoardTitle,
  ColumnTitle,
  CardTitle,
  CardDescription,
};
