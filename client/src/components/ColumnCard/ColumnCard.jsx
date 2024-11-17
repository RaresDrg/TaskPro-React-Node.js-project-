import PropTypes from "prop-types";
import icons from "../../assets/icons/icons.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { useDispatch } from "react-redux";
import { setTargetedCard } from "../../redux/boards/slice";
import { setModalOpen } from "../../redux/modals/slice";

const ColumnCard = ({ className: styles, card }) => {
  const dispatch = useDispatch();

  const today = new Date().toDateString();
  const deadline = card.deadline;

  const isDeadlineTime = today === deadline;
  const overdue = new Date(today).getTime() > new Date(deadline).getTime();

  return (
    <div className={styles}>
      <h3 title={card.title}>{card.title}</h3>
      <p title={card.description}>{card.description}</p>
      <div>
        <div className="priority">
          <span>Priority</span>
          <span>{card.priority}</span>
        </div>
        <div className="deadline">
          <span>Deadline</span>
          <span className={overdue ? "red" : ""}>{deadline}</span>
        </div>
        <div className="action-icons">
          {isDeadlineTime && (
            <>
              <svg className="notification">
                <use href={`${icons}#icon-notificationBell`}></use>
              </svg>
              <span>Deadline&apos;s today. Hurry!</span>
            </>
          )}

          <svg
            onClick={() => {
              dispatch(setTargetedCard(card));
              dispatch(setModalOpen("EditCardModal"));
            }}
          >
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
          <UseAnimations
            animation={trash2}
            size={21}
            strokeColor="currentColor"
            onClick={() => {
              dispatch(setTargetedCard(card));
              dispatch(setModalOpen("DeleteCardModal"));
            }}
          />
        </div>
      </div>
    </div>
  );
};

ColumnCard.propTypes = {
  card: PropTypes.object.isRequired,
};

export default ColumnCard;
