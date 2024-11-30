import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setTargetedCard } from "../../redux/boards/slice";
import { setModalOpen } from "../../redux/modals/slice";
import { Draggable } from "@hello-pangea/dnd";
import { CardTitle } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import { CardDescription } from "../common/EllipsisTooltip/EllipsisTooltip.styled";
import DeadlineIcon from "../common/DeadlineIcon/DeadlineIcon.styled";
import PencilIcon from "../common/PencilIcon/PencilIcon.styled";
import TrashIcon from "../common/TrashIcon/TrashIcon.styled";

const ColumnCard = ({ className: styles, card, index }) => {
  const dispatch = useDispatch();

  const today = new Date().toDateString();
  const deadline = card.deadline;

  const isDeadlineTime = today === deadline;
  const overdue = new Date(today).getTime() > new Date(deadline).getTime();

  return (
    <Draggable draggableId={card["_id"]} index={index}>
      {(provided) => (
        <div
          className={styles}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardTitle text={card.title} />
          <CardDescription text={card.description} />

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
              {isDeadlineTime && <DeadlineIcon />}

              <PencilIcon
                handlerFunction={() => {
                  dispatch(setTargetedCard(card));
                  dispatch(setModalOpen("EditCardModal"));
                }}
              />
              <TrashIcon
                handlerFunction={() => {
                  dispatch(setTargetedCard(card));
                  dispatch(setModalOpen("DeleteCardModal"));
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

ColumnCard.propTypes = {
  card: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default ColumnCard;
