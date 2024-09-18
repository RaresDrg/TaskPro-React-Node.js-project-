import useAuth from "../../hooks/useAuth";
import { LogoOnSidebar as Logo } from "../common/Logo/Logo.styled";
import MyBoards from "../MyBoards/MyBoards.styled";
import ProjectsList from "../ProjectsList/ProjectsList.styled";
import NeedHelp from "../NeedHelp/NeedHelp.styled";
import LogoutBtn from "../LogoutBtn/LogoutBtn.styled";

const LeftSidebar = ({ className: styles }) => {
  const { theme } = useAuth();

  // todo: => projects
  const projects = [
    { name: "Project 1 care testez sa vad", icon: "icon-puzzlePiece", id: 1 },
    { name: "Project 2", icon: "icon-puzzlePiece", id: 2 },
    { name: "Project 3", icon: "icon-puzzlePiece", id: 3 },
    { name: "Project 4", icon: "icon-puzzlePiece", id: 4 },
  ];
  // const projects = null;

  return (
    <aside className={`${styles} ${theme}`}>
      <Logo />
      <MyBoards />
      {projects && <ProjectsList projects={projects} />}
      <NeedHelp />
      <LogoutBtn />
    </aside>
  );
};

export default LeftSidebar;
