import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import icons from "../../../assets/icons/icons.svg";

const FormDeadlineField = (props) => {
  const { className: styles, setFieldValue, deadline = null } = props;
  const [startDate, setStartDate] = useState(deadline ?? new Date());

  //*intrabare: aici daca pun button imi da trigger si la form button
  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <span onClick={onClick} ref={ref}>
      {value}
    </span>
  ));
  DateInput.displayName = "DateInput";

  return (
    <div className={styles}>
      <h3>Deadline</h3>
      <DatePicker
        customInput={<DateInput />}
        selected={startDate}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        calendarStartDay={1}
        showPopperArrow={false}
        popperPlacement="top-start"
        showIcon
        icon={
          <svg>
            <use href={`${icons}#icon-dropdown`}></use>
          </svg>
        }
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
  setFieldValue: PropTypes.func.isRequired,
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

export default FormDeadlineField;
