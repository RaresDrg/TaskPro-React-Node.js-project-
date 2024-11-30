import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import icons from "../../../assets/icons/icons.svg";

const DeadlineIcon = ({ className: styles }) => {
  return (
    <Tippy content={"Deadline is today. Hurry up!"}>
      <svg
        className={`${styles} animate__animated animate__swing animate__infinite`}
        onMouseEnter={(e) => {
          e.target.classList.remove("animate__animated");
        }}
      >
        <use href={`${icons}#icon-notificationBell`}></use>
      </svg>
    </Tippy>
  );
};

export default DeadlineIcon;
