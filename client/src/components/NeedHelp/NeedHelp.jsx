import cactusPot from "../../assets/images/needHelpImg.png";
import icons from "../../assets/icons/icons.svg";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../redux/modals/slice";

const NeedHelp = ({ className: styles }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles}>
      <img src={cactusPot} alt="Cactus Pot" />
      <p>
        If you need help with <b>TaskPro</b>, check out our support resources or
        reach out to our customer support team.
      </p>
      <button
        type="button"
        onClick={() => dispatch(setModalOpen("NeedHelpModal"))}
        data-secondary-action="close burger menu"
      >
        <svg>
          <use href={`${icons}#icon-help`}></use>
        </svg>
        <span>Need help?</span>
      </button>
    </div>
  );
};

export default NeedHelp;
