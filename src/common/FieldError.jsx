import styles from "../app/page.module.css";
import PropTypes from "prop-types";

export default function FieldError(props) {
  const { message } = props;
  return (
    <div className={styles.errorMessage}>
      <p>{message || "System error. Please try again later!"}</p>
    </div>
  );
}

FieldError.propTypes = {
  message: PropTypes.node.isRequired,
};
