import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTheme } from "../../redux/auth/operations";
import useAuth from "../../hooks/useAuth";
import icons from "../../assets//icons/icons.svg";

const ThemeDropdown = ({ className: styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useAuth();

  useEffect(() => {
    isOpen && document.addEventListener("mousedown", handleClose);

    function handleClose(e) {
      if (
        btnRef.current.contains(e.target) ||
        e.target.classList.contains("dropdown-list")
      ) {
        return;
      }

      setIsOpen(false);
    }

    return () => document.removeEventListener("mousedown", handleClose);
  });

  return (
    <div className={styles}>
      <button
        type="button"
        className={`dropdown-trigger ${theme} ${isOpen ? "triggered" : ""}`}
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Theme</span>
        <svg width="16" height="16">
          <use href={`${icons}#icon-dropdown`}></use>
        </svg>
      </button>

      <ul className={`dropdown-list ${theme} ${isOpen ? "visible" : ""}`}>
        <li onClick={() => dispatch(updateTheme("light"))}>Light</li>
        <li onClick={() => dispatch(updateTheme("dark"))}>Dark</li>
        <li onClick={() => dispatch(updateTheme("violet"))}>Violet</li>
      </ul>
    </div>
  );
};

export default ThemeDropdown;
