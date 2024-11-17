import PropTypes from "prop-types";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import icons from "../../../assets/icons/icons.svg";

const FormDeadlineField = ({ className: styles, date, handlerFunctions }) => {
  const { setStartDate, setFieldValue } = handlerFunctions;

  //*intrabare: aici daca pun button imi da trigger si la form button
  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <span onClick={onClick} ref={ref}>
      {value}
    </span>
  ));
  DateInput.displayName = "DateInput";

  const calendarIcon = (
    <svg>
      <use href={`${icons}#icon-dropdown`}></use>
    </svg>
  );

  return (
    <div className={styles}>
      <h3>Deadline</h3>
      <DatePicker
        customInput={<DateInput />}
        selected={date}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        calendarStartDay={1}
        showPopperArrow={false}
        popperPlacement="top-start"
        showIcon
        icon={calendarIcon}
        toggleCalendarOnIconClick
        onChange={(date) => {
          setStartDate(date);
          setFieldValue("deadline", date);
        }}
      />
    </div>
  );
};

FormDeadlineField.propTypes = {
  date: PropTypes.object.isRequired,
  handlerFunctions: PropTypes.shape({
    setStartDate: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }),
};

export default FormDeadlineField;
