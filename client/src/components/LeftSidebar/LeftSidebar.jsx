import { LogoOnSidebar as Logo } from "../common/Logo/Logo.styled";
import MyBoards from "../MyBoards/MyBoards.styled";
import BoardsList from "../BoardsList/BoardsList.styled";
import NeedHelp from "../NeedHelp/NeedHelp.styled";
import LogoutBtn from "../LogoutBtn/LogoutBtn.styled";
import { useBoards } from "../../hooks/hooks";

const LeftSidebar = ({ className: styles }) => {
  const { boardsList } = useBoards();

  return (
    <aside className={styles}>
      <Logo />
      <MyBoards />
      {boardsList && <BoardsList boards={boardsList} />}
      <NeedHelp />
      <LogoutBtn />
    </aside>
  );
};

export default LeftSidebar;
