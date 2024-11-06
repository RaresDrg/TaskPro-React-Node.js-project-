import PropTypes from "prop-types";

const FormTitle = ({ className: styles, title }) => {
  return <h2 className={styles}>{title}</h2>;
};

FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormTitle;
