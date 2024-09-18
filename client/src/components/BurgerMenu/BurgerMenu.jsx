import LeftSidebar from "../LeftSidebar/LeftSidebar.styled";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleBurgerMenu } from "../../redux/modals/slice";

const BurgerMenu = ({ className: styles }) => {
  const burgerMenuRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => burgerMenuRef.current.classList.add("visible"), 0);
    document.addEventListener("mousedown", handleClose);
    document.body.style.overflow = "hidden";

    function handleClose(e) {
      const targetedElements = document.querySelectorAll(
        '[data-secondary-action="close burger menu"]'
      );

      const allowClosing = [...targetedElements].find(
        (el) => el.contains(e.target) || e.target.classList.contains("visible")
      );

      if (allowClosing) {
        burgerMenuRef.current.classList.remove("visible");
        setTimeout(() => dispatch(toggleBurgerMenu()), 500);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles} ref={burgerMenuRef}>
      <LeftSidebar />
    </div>
  );
};

export default BurgerMenu;
