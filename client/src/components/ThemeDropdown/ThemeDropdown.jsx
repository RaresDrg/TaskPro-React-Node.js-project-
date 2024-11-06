import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/auth/slice";
import { updateTheme } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/hooks";
import icons from "../../assets//icons/icons.svg";

const ThemeDropdown = ({ className: styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = "none";
      document.querySelector(".dropdown-list").style.pointerEvents = "auto";
      document.addEventListener("mousedown", handleClose);
    }

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.body.style.pointerEvents = "auto";
    };
  }, [isOpen]);

  function handleClose(e) {
    if (e.target !== document.querySelector(".dropdown-list")) {
      setIsOpen(false);
    }
  }

  function handleClick(e) {
    if (e.target.nodeName === "UL") return;
    if (e.target.classList.contains("active")) return;

    const theme = e.target.textContent;
    dispatch(setTheme(theme));
    updateTheme(theme);
  }

  return (
    <div className={styles}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? "triggered" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <span>Theme</span>
        <svg width="16" height="16">
          <use href={`${icons}#icon-dropdown`}></use>
        </svg>
      </button>

      <ul
        className={`dropdown-list ${isOpen ? "visible" : ""}`}
        onClick={handleClick}
      >
        <li className={theme === "light" ? "active" : ""}>light</li>
        <li className={theme === "dark" ? "active" : ""}>dark</li>
        <li className={theme === "violet" ? "active" : ""}>violet</li>
      </ul>
    </div>
  );
};

export default ThemeDropdown;
