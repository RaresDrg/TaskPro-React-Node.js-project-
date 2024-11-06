import BoardItem from "../BoardItem/BoardItem.styled";
import PropTypes from "prop-types";

const BoardsList = ({ className: styles, boards }) => {
  return (
    <ul className={styles}>
      {boards.map((item) => (
        <BoardItem key={item["_id"]} board={item} />
      ))}
    </ul>
  );
};

BoardsList.propTypes = {
  boards: PropTypes.array.isRequired,
};

export default BoardsList;
