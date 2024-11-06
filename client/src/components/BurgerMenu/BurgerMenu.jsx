import LeftSidebar from "../LeftSidebar/LeftSidebar.styled";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../redux/modals/slice";

const BurgerMenu = ({ className: styles }) => {
  const burgerMenuRef = useRef();
  const dispatch = useDispatch();

  function handleClose(e) {
    const availableTargets = document.querySelectorAll(
      '[data-secondary-action="close burger menu"]'
    );

    const targetedElement = [...availableTargets].find((el) =>
      el.contains(e.target)
    );

    if (targetedElement || e.currentTarget === e.target) {
      burgerMenuRef.current.classList.add("hidden");
      setTimeout(() => dispatch(setModalClose("BurgerMenu")), 500);
    }
  }

  return (
    <div className={styles} ref={burgerMenuRef} onClick={handleClose}>
      <LeftSidebar />
    </div>
  );
};

export default BurgerMenu;
