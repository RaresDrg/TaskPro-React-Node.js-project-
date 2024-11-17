import { LogoOnSidebar as Logo } from "../common/Logo/Logo.styled";
import MyBoards from "../MyBoards/MyBoards.styled";
import NeedHelp from "../NeedHelp/NeedHelp.styled";
import LogoutBtn from "../LogoutBtn/LogoutBtn.styled";

const LeftSidebar = ({ className: styles }) => {
  return (
    <aside className={styles}>
      <Logo />
      <MyBoards />
      <NeedHelp />
      <LogoutBtn />
    </aside>
  );
};

export default LeftSidebar;
